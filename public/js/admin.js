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

  // Pestañas
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

  // Limpiar credenciales guardadas para exigir siempre el PIN de acceso al docente
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
        if (btnLogout) btnLogout.style.display = 'inline-flex';
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
    const maxSample = list.length > 0 ? list[0].max_auto_score : (activeTab === 'bonus' ? 33 : 31);

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
      const percentage = (sub.total_auto_score / sub.max_auto_score) * 100;
      let badgeClass = 'score-mid';
      if (percentage >= 70) badgeClass = 'score-high';
      else if (percentage < 50) badgeClass = 'score-low';

      const formattedAttempt = sub.attempt_time ? new Date(sub.attempt_time).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) : 'No registrada';

      const formattedDate = new Date(sub.submitted_at).toLocaleString('es-ES', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });

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
              ${activeTab === 'bonus' ? '🚀 Bonus Completo' : `P6: ${sub.writing_part6 ? '✅ Escrito' : '❌ Vacío'}<br>P7: ${sub.writing_part7 ? '✅ Escrito' : '❌ Vacío'}`}
            </span>
          </td>
          <td style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">
            🕒 ${formattedAttempt}
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

  // Búsqueda y Filtros
  searchInput.addEventListener('input', applyFilters);
  gradeFilter.addEventListener('change', applyFilters);
  btnRefresh.addEventListener('click', loadSubmissions);

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

  // Ver Detalle de Entrega
  window.viewSubmissionDetail = async function(id) {
    try {
      const endpoint = activeTab === 'bonus' ? `/api/bonus/submissions/${id}` : `/api/admin/submissions/${id}`;
      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        const sub = data.submission;

        document.getElementById('modal-student-name').textContent = `${sub.first_name} ${sub.last_name}`;
        document.getElementById('modal-student-meta').textContent = `Grado: ${sub.grade} | Enviado: ${new Date(sub.submitted_at).toLocaleString()}`;
        document.getElementById('modal-student-avatar').textContent = (sub.first_name.charAt(0) + sub.last_name.charAt(0)).toUpperCase();

        const scoreRwElem = document.getElementById('modal-score-rw');
        if (scoreRwElem) scoreRwElem.textContent = `${sub.total_auto_score}`;
        
        const scoreTotalElem = document.getElementById('modal-score-total');
        if (scoreTotalElem) scoreTotalElem.textContent = `${sub.total_auto_score} / ${sub.max_auto_score}`;

        const p6Elem = document.getElementById('modal-writing-p6');
        if (p6Elem) p6Elem.textContent = sub.writing_part6 || sub.bonus_writing || 'Sin respuesta redactada.';

        const p7Elem = document.getElementById('modal-writing-p7');
        if (p7Elem) p7Elem.textContent = sub.writing_part7 || 'Sin respuesta redactada.';

        detailModal.classList.add('active');
      } else {
        alert('Error al consultar el detalle.');
      }
    } catch (err) {
      console.error('Error al ver detalle:', err);
    }
  };

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
