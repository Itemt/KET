/* ==========================================================================
   CAMBRIDGE KET A2 MOCK EXAM - ADMIN DASHBOARD CLIENT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let submissionsList = [];
  let currentPasscode = '';
  let activeTab = 'main'; // 'main' o 'bonus'

  // Elementos DOM
  const loginOverlay = document.getElementById('admin-login-overlay');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('login-error');
  const dashboardContent = document.getElementById('admin-dashboard-content');
  const tbody = document.getElementById('submissions-tbody');
  const searchInput = document.getElementById('search-input');
  const gradeFilter = document.getElementById('grade-filter');
  const btnRefresh = document.getElementById('btn-refresh');

  // Elementos Modal Detalle
  const detailModal = document.getElementById('detail-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const btnLogout = document.getElementById('btn-admin-logout');

  // Pestañas Principales Admin
  const tabBtnMain = document.getElementById('tab-btn-main');
  const tabBtnBonus = document.getElementById('tab-btn-bonus');

  if (tabBtnMain) {
    tabBtnMain.addEventListener('click', () => {
      activeTab = 'main';
      tabBtnMain.classList.add('active');
      if (tabBtnBonus) tabBtnBonus.classList.remove('active');
      loadSubmissions();
    });
  }

  if (tabBtnBonus) {
    tabBtnBonus.addEventListener('click', () => {
      activeTab = 'bonus';
      tabBtnBonus.classList.add('active');
      if (tabBtnMain) tabBtnMain.classList.remove('active');
      loadSubmissions();
    });
  }

  // Pestañas internas del Modal Detalle
  setupModalTabSwitcher();

  sessionStorage.removeItem('admin_passcode');

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('admin_passcode');
      currentPasscode = '';
      dashboardContent.style.display = 'none';
      btnLogout.style.display = 'none';
      loginOverlay.classList.add('active');
    });
  }

  /* --- Formulario de Login Admin --- */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passcode = document.getElementById('admin-passcode').value.trim();
    attemptLogin(passcode);
  });

  async function attemptLogin(passcode) {
    const cleanPass = passcode.trim();
    if (cleanPass === 'ket2026') {
      currentPasscode = cleanPass;
      sessionStorage.setItem('admin_passcode', cleanPass);
      loginOverlay.classList.remove('active');
      dashboardContent.style.display = 'block';
      if (btnLogout) btnLogout.style.display = 'inline-flex';
      loadSubmissions();
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: cleanPass })
      });
      const data = await res.json();

      if (data.success) {
        currentPasscode = cleanPass;
        sessionStorage.setItem('admin_passcode', cleanPass);
        loginOverlay.classList.remove('active');
        dashboardContent.style.display = 'block';
        if (btnLogout) btnLogout.style.display = 'inline-flex';
        loadSubmissions();
      } else {
        loginError.style.display = 'block';
        loginError.textContent = 'PIN incorrecto. Intenta nuevamente.';
      }
    } catch (err) {
      loginError.style.display = 'block';
      loginError.textContent = 'Error al validar PIN. Verifica tu conexión.';
    }
  }

  /* --- Cargar Entregas desde la API --- */
  async function loadSubmissions() {
    try {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">Cargando lista de entregas...</td></tr>`;

      const endpoint = activeTab === 'bonus' ? '/api/bonus/submissions' : '/api/admin/submissions';
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        submissionsList = data.submissions;
        updateDashboardStats(submissionsList);
        renderSubmissionsTable(submissionsList);
      } else {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--danger); padding: 30px;">Error al cargar las entregas.</td></tr>`;
      }
    } catch (err) {
      console.error('Error al obtener entregas:', err);
    }
  }

  /* --- Actualizar Métricas Estadísticas --- */
  function updateDashboardStats(list) {
    document.getElementById('stat-total-submissions').textContent = list.length;

    let totalScore = 0;
    list.forEach(sub => {
      totalScore += sub.total_auto_score;
    });

    const avg = list.length > 0 ? (totalScore / list.length).toFixed(1) : 0;
    const maxSample = list.length > 0 ? list[0].max_auto_score : (activeTab === 'bonus' ? 33 : 148);

    const avgElem = document.getElementById('stat-avg-score');
    if (avgElem) avgElem.textContent = `${avg} / ${maxSample}`;
  }

  /* --- Renderizar Tabla de Entregas --- */
  function renderSubmissionsTable(list) {
    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">
            ${activeTab === 'bonus' ? 'No hay entregas registradas en el Examen Bonus aún.' : 'No hay respuestas registradas aún.'}
          </td>
        </tr>
      `;
      return;
    }

    let html = '';
    list.forEach(sub => {
      const percentage = (sub.total_auto_score / (sub.max_auto_score || 1)) * 100;
      let badgeClass = 'score-med';
      if (percentage >= 70) badgeClass = 'score-high';
      else if (percentage < 50) badgeClass = 'score-low';

      const formattedAttempt = sub.attempt_time ? new Date(sub.attempt_time).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) : 'No registrada';

      if (activeTab === 'bonus') {
        html += `
          <tr>
            <td><strong>#${sub.submission_id}</strong></td>
            <td><div style="font-weight: 700; color: var(--dark);">${sub.first_name} ${sub.last_name}</div></td>
            <td><span style="font-weight: 600; color: var(--primary);">${sub.grade}</span></td>
            <td colspan="2"><span class="score-pill score-high">🚀 Bonus Completo</span></td>
            <td><span class="score-pill ${badgeClass}">${sub.total_auto_score} / ${sub.max_auto_score} (${Math.round(percentage)}%)</span></td>
            <td style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">🕒 ${formattedAttempt}</td>
            <td>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewSubmissionDetail(${sub.submission_id})">👁️ Ver</button>
            </td>
          </tr>
        `;
      } else {
        html += `
          <tr>
            <td><strong>#${sub.submission_id}</strong></td>
            <td><div style="font-weight: 700; color: var(--dark);">${sub.first_name} ${sub.last_name}</div></td>
            <td><span style="font-weight: 600; color: var(--primary);">${sub.grade}</span></td>
            <td>
              <span class="score-pill score-high" style="background: #e0f2fe; color: #0369a1;">
                🎧 ${sub.score_listening || 0} / 100
              </span>
            </td>
            <td>
              <span class="score-pill score-med">
                📖 ${sub.score_reading_writing || 0} / 48
              </span>
            </td>
            <td>
              <span class="score-pill ${badgeClass}">
                🏆 ${sub.total_auto_score} / ${sub.max_auto_score || 148} (${Math.round(percentage)}%)
              </span>
            </td>
            <td style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">🕒 ${formattedAttempt}</td>
            <td>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem;" onclick="viewSubmissionDetail(${sub.submission_id})">
                  👁️ Ver
                </button>
                <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="deleteSubmissionItem(${sub.submission_id})">
                  🗑️
                </button>
              </div>
            </td>
          </tr>
        `;
      }
    });

    tbody.innerHTML = html;
  }

  // Búsqueda y Filtros
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (gradeFilter) gradeFilter.addEventListener('change', applyFilters);
  if (btnRefresh) btnRefresh.addEventListener('click', loadSubmissions);

  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const selectedGrade = gradeFilter.value;

    const filtered = submissionsList.filter(sub => {
      const fullName = `${sub.first_name} ${sub.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(term);
      const matchesGrade = selectedGrade === 'ALL' || sub.grade === selectedGrade;
      return matchesSearch && matchesGrade;
    });

    renderSubmissionsTable(filtered);
  }

  /* --- Cambiador de Pestañas dentro del Modal Detalle --- */
  function setupModalTabSwitcher() {
    const btnListening = document.getElementById('btn-modal-tab-listening');
    const btnRW = document.getElementById('btn-modal-tab-rw');
    const btnWriting = document.getElementById('btn-modal-tab-writing');

    const contentListening = document.getElementById('modal-tab-listening-content');
    const contentRW = document.getElementById('modal-tab-rw-content');
    const contentWriting = document.getElementById('modal-tab-writing-content');

    if (btnListening && btnRW && btnWriting) {
      btnListening.addEventListener('click', () => {
        setModalTabActive(btnListening, contentListening);
      });
      btnRW.addEventListener('click', () => {
        setModalTabActive(btnRW, contentRW);
      });
      btnWriting.addEventListener('click', () => {
        setModalTabActive(btnWriting, contentWriting);
      });
    }

    function setModalTabActive(activeBtn, activeContent) {
      [btnListening, btnRW, btnWriting].forEach(btn => {
        btn.style.background = '#f1f5f9';
        btn.style.color = 'var(--text-muted)';
      });
      [contentListening, contentRW, contentWriting].forEach(cnt => {
        cnt.style.display = 'none';
      });

      activeBtn.style.background = '#e0f2fe';
      activeBtn.style.color = '#0369a1';
      activeContent.style.display = 'block';
    }
  }

  /* --- Ver Detalle de Entrega --- */
  window.viewSubmissionDetail = async function(id) {
    try {
      const endpoint = activeTab === 'bonus' ? `/api/bonus/submissions/${id}` : `/api/admin/submissions/${id}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        const sub = data.submission;

        document.getElementById('modal-student-name').textContent = `${sub.first_name} ${sub.last_name}`;
        document.getElementById('modal-student-meta').textContent = `Grado: ${sub.grade} | Envió: ${new Date(sub.submitted_at).toLocaleString()}`;
        document.getElementById('modal-student-avatar').textContent = (sub.first_name.charAt(0) + sub.last_name.charAt(0)).toUpperCase();

        const scoreListElem = document.getElementById('modal-score-listening');
        if (scoreListElem) scoreListElem.textContent = `${sub.score_listening || 0} / 100`;

        const scoreRwElem = document.getElementById('modal-score-rw');
        if (scoreRwElem) scoreRwElem.textContent = `${sub.score_reading_writing || 0} / 48`;

        const scoreTotalElem = document.getElementById('modal-score-total');
        if (scoreTotalElem) scoreTotalElem.textContent = `${sub.total_auto_score} / ${sub.max_auto_score || 148}`;

        const p6Elem = document.getElementById('modal-writing-p6');
        if (p6Elem) p6Elem.textContent = sub.writing_part6 || sub.bonus_writing || 'Sin respuesta redactada.';

        const p7Elem = document.getElementById('modal-writing-p7');
        if (p7Elem) p7Elem.textContent = sub.writing_part7 || 'Sin respuesta redactada.';

        // Renderizar las respuestas individuales de Listening (100 Preguntas)
        renderModalListeningAnswers(sub.raw_answers_json || {});
        renderModalRWAnswers(sub.raw_answers_json || {});

        detailModal.classList.add('active');
      } else {
        alert('Error al consultar el detalle.');
      }
    } catch (err) {
      console.error('Error al ver detalle:', err);
    }
  };

  /* --- Renderizar Lista de Respuestas de Listening en Modal --- */
  function renderModalListeningAnswers(answersObj) {
    const container = document.getElementById('modal-listening-answers-container');
    if (!container) return;

    let html = '';
    let foundCount = 0;

    for (let i = 1; i <= 100; i++) {
      const qKey = `listening_q${i}`;
      const given = answersObj[qKey];

      if (given !== undefined && given !== null && given !== '') {
        foundCount++;
        let trackTag = 'Audio 1';
        let trackBorder = '#06b6d4';
        let tagBg = '#e0f2fe';
        let tagColor = '#0369a1';

        if (i >= 26 && i <= 50) {
          trackTag = 'Audio 2';
          trackBorder = '#8b5cf6';
          tagBg = '#f3e8ff';
          tagColor = '#6d28d9';
        } else if (i >= 51 && i <= 75) {
          trackTag = 'Audio 3';
          trackBorder = '#10b981';
          tagBg = '#d1fae5';
          tagColor = '#047857';
        } else if (i >= 76) {
          trackTag = 'Audio 4';
          trackBorder = '#eab308';
          tagBg = '#fef9c3';
          tagColor = '#a16207';
        }

        html += `
          <div style="background: #f8fafc; border-left: 4px solid ${trackBorder}; padding: 10px 14px; border-radius: var(--radius-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; font-size: 0.85rem; color: var(--dark);">Pregunta ${i} (${qKey}):</span>
              <span style="font-size: 0.7rem; font-weight: 800; background: ${tagBg}; color: ${tagColor}; padding: 2px 6px; border-radius: 4px;">${trackTag}</span>
            </div>
            <div style="font-size: 0.95rem; font-weight: 600; color: ${tagColor}; margin-top: 4px;">
              📝 Respuesta alumno: <span style="background: white; border: 1px solid var(--border-color); padding: 2px 8px; border-radius: 4px;">${given}</span>
            </div>
          </div>
        `;
      }
    }

    if (foundCount === 0) {
      html = `<div style="grid-column: 1 / -1; color: var(--text-muted); padding: 15px; text-align: center; background: #f8fafc; border-radius: 8px;">No se registraron respuestas de Listening en esta entrega.</div>`;
    }

    container.innerHTML = html;
  }

  /* --- Renderizar Lista de Respuestas de Reading & Writing en Modal --- */
  function renderModalRWAnswers(answersObj) {
    const container = document.getElementById('modal-rw-answers-container');
    if (!container) return;

    let html = '';
    let foundCount = 0;

    Object.keys(answersObj).sort().forEach(key => {
      if (key.startsWith('rw_')) {
        foundCount++;
        const val = answersObj[key];
        html += `
          <div style="background: #f8fafc; border-left: 4px solid var(--primary); padding: 10px 14px; border-radius: var(--radius-sm);">
            <div style="font-weight: 700; font-size: 0.85rem; color: var(--dark);">${key}:</div>
            <div style="font-size: 0.95rem; font-weight: 600; color: var(--primary); margin-top: 2px;">
              📝 Respuesta: <span style="background: var(--primary-light); padding: 2px 8px; border-radius: 4px;">${val}</span>
            </div>
          </div>
        `;
      }
    });

    if (foundCount === 0) {
      html = `<div style="grid-column: 1 / -1; color: var(--text-muted); padding: 15px; text-align: center; background: #f8fafc; border-radius: 8px;">No se registraron respuestas de Reading & Writing en esta entrega.</div>`;
    }

    container.innerHTML = html;
  }

  // Cerrar Modal Detalle
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }

  // Eliminar Entrega
  window.deleteSubmissionItem = async function(id) {
    const confirmDelete = confirm('¿Estás seguro de eliminar esta entrega? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      const endpoint = activeTab === 'bonus' ? `/api/bonus/submissions/${id}` : `/api/admin/submissions/${id}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        loadSubmissions();
      } else {
        alert('Error al eliminar la entrega.');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };
});
