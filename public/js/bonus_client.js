document.addEventListener('DOMContentLoaded', () => {
  const authOverlay = document.getElementById('bonus-auth-overlay');
  const authForm = document.getElementById('bonus-auth-form');
  const studentSelect = document.getElementById('bonus-student-select');
  const usernameInput = document.getElementById('bonus-username');
  const passwordInput = document.getElementById('bonus-password');
  const loginError = document.getElementById('bonus-login-error');

  let currentStudent = null;
  let bonusExamData = null;

  loadStudentsList();

  async function loadStudentsList() {
    try {
      const res = await fetch('/api/students/list');
      const data = await res.json();
      if (data.success && data.students) {
        studentSelect.innerHTML = '<option value="">-- Selecciona tu nombre --</option>';

        const gradesMap = {};
        data.students.forEach(st => {
          const g = st.grade || '6to';
          if (!gradesMap[g]) gradesMap[g] = [];
          gradesMap[g].push(st);
        });

        Object.keys(gradesMap).sort().forEach(gradeName => {
          const groupEl = document.createElement('optgroup');
          groupEl.label = `─── GRADO ${gradeName.toUpperCase()} ───`;
          gradesMap[gradeName].forEach(st => {
            const opt = document.createElement('option');
            opt.value = st.username;
            opt.textContent = `${st.fullName} (${st.username})`;
            groupEl.appendChild(opt);
          });
          studentSelect.appendChild(groupEl);
        });
      }
    } catch (e) {}
  }

  studentSelect.addEventListener('change', () => {
    const val = studentSelect.value;
    if (val) {
      usernameInput.value = val;
      passwordInput.value = val;
    }
  });

  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      const res = await fetch('/api/bonus/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        currentStudent = data.student;
        authOverlay.classList.remove('active');
        setupHeader(currentStudent);
        fetchBonusExam();
      } else {
        loginError.style.display = 'block';
        loginError.textContent = data.message || 'Error al ingresar.';
      }
    } catch (err) {
      loginError.style.display = 'block';
      loginError.textContent = 'Error de conexión.';
    }
  });

  function setupHeader(s) {
    document.getElementById('student-display-name').textContent = s.fullName || `${s.first_name} ${s.last_name}`;
    document.getElementById('student-display-grade').textContent = s.grade || '6to';
    const initials = (s.first_name.charAt(0) + (s.last_name ? s.last_name.charAt(0) : '')).toUpperCase();
    document.getElementById('student-avatar').textContent = initials;
  }

  async function fetchBonusExam() {
    try {
      const res = await fetch('/api/bonus/exam');
      const data = await res.json();
      if (data.success) {
        bonusExamData = data.exam;
        renderBonusExam(bonusExamData.sections.bonus_reading_writing);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function renderBonusExam(sec) {
    const container = document.getElementById('bonus-reading-writing-container');
    let html = '';

    sec.parts.forEach(part => {
      html += `
        <div class="card">
          <div class="part-header">
            <h3 class="part-title">🚀 Part ${part.part}</h3>
            <p class="instructions">${part.instructions}</p>
          </div>
      `;

      if (part.passage) {
        html += `<div class="context-box" style="line-height: 2; font-size: 1.05rem; white-space: pre-wrap; margin-bottom: 20px;">${part.passage}</div>`;
      }

      if (part.type === 'multiple_choice') {
        part.questions.forEach(q => {
          html += `
            <div class="question-block">
              ${q.context ? `<div class="context-box">${q.context}</div>` : ''}
              <p style="font-weight: 700; margin-bottom: 12px;">${q.question}</p>
              <div class="options-group">
                ${Object.entries(q.options).map(([key, val]) => `
                  <label class="option-label">
                    <input type="radio" name="${q.id}" value="${key}" class="option-input">
                    <span class="option-text"><strong>${key})</strong> ${val}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        });
      } else if (part.type === 'matching_notices') {
        html += `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; margin-bottom: 20px;">`;
        part.notices.forEach(n => {
          html += `
            <div class="context-box" style="margin-bottom: 0;">
              <strong style="color: #7c3aed;">${n.title}</strong><br>${n.text}
            </div>
          `;
        });
        html += `</div>`;

        part.questions.forEach(q => {
          html += `
            <div class="question-block">
              <p style="font-weight: 700; margin-bottom: 12px;">${q.question}</p>
              <div class="options-group" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px;">
                ${Object.entries(q.options).map(([key, val]) => `
                  <label class="option-label" style="margin-bottom: 0;">
                    <input type="radio" name="${q.id}" value="${key}" class="option-input">
                    <span class="option-text"><strong>${val}</strong></span>
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        });
      } else if (part.type === 'multiple_choice_cloze') {
        part.questions.forEach(q => {
          html += `
            <div class="question-block">
              <p style="font-weight: 700; margin-bottom: 12px;">Gap (${q.gapNumber}):</p>
              <div class="options-group">
                ${Object.entries(q.options).map(([key, val]) => `
                  <label class="option-label">
                    <input type="radio" name="${q.id}" value="${key}" class="option-input">
                    <span class="option-text"><strong>${key})</strong> ${val}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          `;
        });
      } else if (part.type === 'open_cloze') {
        part.questions.forEach(q => {
          html += `
            <div class="question-block" style="display: flex; align-items: center; gap: 12px;">
              <label style="font-weight: 700; min-width: 90px;">Gap (${q.gapNumber}):</label>
              <input type="text" name="${q.id}" class="input-field" placeholder="Write 1 word..." style="max-width: 250px;">
            </div>
          `;
        });
      } else if (part.type === 'text_production_double') {
        html += `
          <div class="question-block" style="margin-bottom: 20px;">
            <label class="form-label" style="font-weight: 700; font-size: 1.05rem; color: #7c3aed;">✍️ Task 6A: Camping Email Reply (Min 30 words):</label>
            <textarea name="${part.fieldNameA}" class="input-field" rows="5" placeholder="Write your email reply in English..." style="resize: vertical;"></textarea>
          </div>
          <div class="question-block">
            <label class="form-label" style="font-weight: 700; font-size: 1.05rem; color: #7c3aed;">✍️ Task 6B: Mysterious Sound Story Continuation (Min 40 words):</label>
            <textarea name="${part.fieldNameB}" class="input-field" rows="6" placeholder="Continue the mysterious story in English..." style="resize: vertical;"></textarea>
          </div>
        `;
      }

      html += `</div>`;
    });

    container.innerHTML = html;
  }

  const btnSubmit = document.getElementById('btn-submit-bonus');
  btnSubmit.addEventListener('click', async () => {
    if (!currentStudent) return alert('Por favor inicia sesión.');

    const confirmSubmit = confirm('¿Estás seguro de enviar tu Examen Bonus?');
    if (!confirmSubmit) return;

    const form = document.getElementById('bonus-exam-form');
    const formData = new FormData(form);
    const answersObj = {};
    formData.forEach((val, key) => answersObj[key] = val);

    const payload = {
      student: {
        firstName: currentStudent.first_name || currentStudent.firstName,
        lastName: currentStudent.last_name || currentStudent.lastName || '',
        grade: currentStudent.grade || '6to',
        username: currentStudent.username || ''
      },
      answers: answersObj,
      attempt_time: currentStudent.attemptTime || new Date().toISOString()
    };

    try {
      const res = await fetch('/api/bonus/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (result.success) {
        document.getElementById('bonus-res-score').textContent = `${result.score.total} / ${result.score.max}`;
        document.getElementById('bonus-results-modal').classList.add('active');
      } else {
        alert(result.message || 'Error al enviar.');
      }
    } catch (e) {
      alert('Error de conexión.');
    }
  });
});
