document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay = document.getElementById('bonus-admin-login-overlay');
  const loginForm = document.getElementById('bonus-admin-login-form');
  const loginError = document.getElementById('bonus-login-error');
  const dashboardContent = document.getElementById('bonus-dashboard-content');
  const tbody = document.getElementById('bonus-submissions-tbody');
  const btnLogout = document.getElementById('btn-bonus-logout');

  sessionStorage.removeItem('bonus_admin_passcode');

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('bonus_admin_passcode');
      dashboardContent.style.display = 'none';
      loginOverlay.classList.add('active');
    });
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const passcode = document.getElementById('bonus-admin-passcode').value.trim();
    if (passcode === 'ket2026') {
      loginOverlay.classList.remove('active');
      dashboardContent.style.display = 'block';
      loadBonusSubmissions();
    } else {
      loginError.style.display = 'block';
    }
  });

  async function loadBonusSubmissions() {
    try {
      const res = await fetch('/api/bonus/submissions');
      const data = await res.json();
      if (data.success && data.submissions) {
        renderTable(data.submissions);
      } else {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--danger); padding: 30px;">Error al cargar.</td></tr>`;
      }
    } catch (e) {
      console.error(e);
    }
  }

  function renderTable(list) {
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 30px;">No hay respuestas de bonus registradas aún.</td></tr>`;
      return;
    }

    let html = '';
    list.forEach(sub => {
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
          <td><div style="font-weight: 700;">${sub.first_name} ${sub.last_name}</div></td>
          <td><span style="font-weight: 600; color: #7c3aed;">${sub.grade}</span></td>
          <td>
            <span class="score-pill score-high">${sub.total_auto_score} / ${sub.max_auto_score}</span>
          </td>
          <td style="font-size: 0.85rem; color: #7c3aed; font-weight: 600;">🕒 ${formattedAttempt}</td>
          <td style="font-size: 0.85rem; color: var(--text-muted);">${formattedDate}</td>
          <td>
            <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;" onclick="deleteBonusItem(${sub.submission_id})">
              🗑️
            </button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  window.deleteBonusItem = async function(id) {
    if (!confirm('¿Eliminar esta entrega del Bonus?')) return;
    try {
      await fetch(`/api/bonus/submissions/${id}`, { method: 'DELETE' });
      loadBonusSubmissions();
    } catch (e) {}
  };
});
