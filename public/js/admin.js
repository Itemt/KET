/* ==========================================================================
   CAMBRIDGE KET A2 MOCK EXAM - ADMIN DASHBOARD CLIENT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  let submissionsList = [];
  let currentPasscode = '';

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

  // Check login previo en sessionStorage
  const savedPasscode = sessionStorage.getItem('admin_passcode');
  if (savedPasscode) {
    attemptLogin(savedPasscode);
  }

  /* --- Formulario de Login --- */
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const passcode = document.getElementById('admin-passcode').value.trim();
    attemptLogin(passcode);
  });

  async function attemptLogin(passcode) {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();

      if (data.success) {
        currentPasscode = passcode;
        sessionStorage.setItem('admin_passcode', passcode);
        loginOverlay.classList.remove('active');
        dashboardContent.style.display = 'block';
        loadSubmissions();
      } else {
        loginError.style.display = 'block';
      }
    } catch (err) {
      console.error('Error al autenticar:', err);
      alert('Error de conexión al autenticar.');
    }
  }

  /* --- Cargar Entregas desde la API --- */
  async function loadSubmissions() {
    try {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">Cargando lista de entregas...</td></tr>`;

      const res = await fetch('/api/admin/submissions');
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
    let maxScoreSum = 0;
    let speakingCount = 0;

    list.forEach(sub => {
      totalScore += sub.total_auto_score;
      maxScoreSum += sub.max_auto_score;
      if (sub.speaking_audio_url && sub.speaking_audio_url.trim() !== '') {
        speakingCount++;
      }
    });

    const avg = list.length > 0 ? (totalScore / list.length).toFixed(1) : 0;
    const maxSample = list.length > 0 ? list[0].max_auto_score : 0;

    document.getElementById('stat-avg-score').textContent = `${avg} / ${maxSample}`;
    document.getElementById('stat-speaking-count').textContent = speakingCount;
  }

  /* --- Renderizar Tabla de Entregas --- */
  function renderSubmissionsTable(list) {
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted); padding: 30px;">No hay respuestas registradas aún.</td></tr>`;
      return;
    }

    let html = '';
    list.forEach(sub => {
      const percentage = sub.max_auto_score > 0 ? (sub.total_auto_score / sub.max_auto_score) * 100 : 0;
      let badgeClass = 'score-med';
      if (percentage >= 70) badgeClass = 'score-high';
      else if (percentage < 50) badgeClass = 'score-low';

      const formattedDate = new Date(sub.submitted_at).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const hasAudio = sub.speaking_audio_url && sub.speaking_audio_url.trim() !== '';

      html += `
        <tr>
          <td><strong>#${sub.submission_id}</strong></td>
          <td>
            <div style="font-weight: 700; color: var(--dark);">${sub.first_name} ${sub.last_name}</div>
          </td>
          <td><span style="font-weight: 600; color: var(--primary);">${sub.grade}</span></td>
          <td>
            <span class="score-pill ${badgeClass}">${sub.total_auto_score} / ${sub.max_auto_score} (${Math.round(percentage)}%)</span>
          </td>
          <td>
            <span style="font-size: 0.85rem; color: var(--text-muted);">
              P6: ${sub.writing_part6 ? '✅ Escrito' : '❌ Vacío'}<br>
              P7: ${sub.writing_part7 ? '✅ Escrito' : '❌ Vacío'}
            </span>
          </td>
          <td>
            ${hasAudio ? '<span style="color: var(--success); font-weight: 700;">🎙️ Audio listo</span>' : '<span style="color: var(--text-muted);">Sin audio</span>'}
          </td>
          <td style="font-size: 0.85rem; color: var(--text-muted);">${formattedDate}</td>
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
    });

    tbody.innerHTML = html;
  }

  /* --- Filtrado y Búsqueda --- */
  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGrade = gradeFilter.value;

    const filtered = submissionsList.filter(sub => {
      const fullName = `${sub.first_name} ${sub.last_name}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm);
      const matchesGrade = selectedGrade === 'ALL' || sub.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });

    renderSubmissionsTable(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  gradeFilter.addEventListener('change', applyFilters);
  btnRefresh.addEventListener('click', loadSubmissions);

  /* --- Ver Detalle de una Entrega --- */
  window.viewSubmissionDetail = async function(id) {
    try {
      const res = await fetch(`/api/admin/submissions/${id}`);
      const data = await res.json();

      if (data.success) {
        const sub = data.submission;

        document.getElementById('modal-student-name').textContent = `${sub.first_name} ${sub.last_name}`;
        document.getElementById('modal-student-meta').textContent = `Grado: ${sub.grade} | Enviado: ${new Date(sub.submitted_at).toLocaleString()}`;
        document.getElementById('modal-student-avatar').textContent = (sub.first_name.charAt(0) + sub.last_name.charAt(0)).toUpperCase();

        document.getElementById('modal-score-rw').textContent = `${sub.score_reading_writing}`;
        document.getElementById('modal-score-lis').textContent = `${sub.score_listening}`;
        document.getElementById('modal-score-total').textContent = `${sub.total_auto_score} / ${sub.max_auto_score}`;

        document.getElementById('modal-writing-p6').textContent = sub.writing_part6 || 'Sin respuesta redactada.';
        document.getElementById('modal-writing-p7').textContent = sub.writing_part7 || 'Sin respuesta redactada.';

        // Renderizar reproductor de audio de Speaking
        const speakingContainer = document.getElementById('modal-speaking-container');
        if (sub.speaking_audio_url && sub.speaking_audio_url.trim() !== '') {
          speakingContainer.innerHTML = `
            <div style="background: linear-gradient(135deg, #fdf4ff, #eef2ff); border: 1.5px solid var(--accent); border-radius: var(--radius-md); padding: 16px; text-align: center;">
              <p style="font-weight: 700; color: var(--dark); margin-bottom: 8px;">🎙️ Grabación de voz transmitida por el alumno:</p>
              <audio controls src="${sub.speaking_audio_url}" style="width: 100%; max-width: 500px; margin-top: 6px;"></audio>
              <div style="margin-top: 6px;">
                <a href="${sub.speaking_audio_url}" download="speaking_student_${sub.student_id}.webm" style="font-size: 0.85rem; color: var(--primary); font-weight: 600; text-decoration: none;">
                  ⬇️ Descargar archivo de audio (.webm)
                </a>
              </div>
            </div>
          `;
        } else {
          speakingContainer.innerHTML = `<div style="color: var(--text-muted); font-style: italic;">No se grabó ningún audio para la sección de Speaking.</div>`;
        }

        detailModal.classList.add('active');
      } else {
        alert('Error al consultar el detalle.');
      }
    } catch (err) {
      console.error('Error al ver detalle:', err);
    }
  };

  /* --- Eliminar Entrega --- */
  window.deleteSubmissionItem = async function(id) {
    if (!confirm(`¿Estás seguro de eliminar el registro de entrega #${id}? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/submissions/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        loadSubmissions();
      } else {
        alert(`Error al eliminar: ${data.message}`);
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  // Cerrar Modal
  modalCloseBtn.addEventListener('click', () => {
    detailModal.classList.remove('active');
  });

  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) {
      detailModal.classList.remove('active');
    }
  });
});
