document.addEventListener("DOMContentLoaded", () => {
  const authForm = document.getElementById("auth-form");
  const passInput = document.getElementById("pass-input");
  const authError = document.getElementById("auth-error");
  const authScreen = document.getElementById("auth-screen");
  const appScreen = document.getElementById("app-screen");

  const urlInput = document.getElementById("url-input");
  const btnVideo = document.getElementById("btn-video");
  const btnAudio = document.getElementById("btn-audio");
  const statusContainer = document.getElementById("status-container");

  // O URL da API que será hospedada na nuvem
  const API_URL = "https://api-ferramentas-c507.onrender.com/download";

  // Autenticação Simples
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Senha simples e fixa para uso pessoal
    if (passInput.value === "gg2026") {
      authScreen.style.display = "none";
      appScreen.style.display = "block";
    } else {
      authError.style.display = "block";
      passInput.value = "";
    }
  });

  // Função genérica de Download
  async function startDownload(format) {
    const url = urlInput.value.trim();
    if (!url) {
      statusContainer.innerHTML = "<span style='color: #ef4444;'>Por favor, insira uma URL válida.</span>";
      return;
    }

    // UI Feedback
    btnVideo.disabled = true;
    btnAudio.disabled = true;
    statusContainer.innerHTML = `<span class="loading-spinner"></span> <span style="color: var(--primary);">Conectando ao servidor na nuvem... Isso pode demorar alguns minutos dependendo do tamanho do vídeo.</span>`;

    try {
      // Faz a requisição para a nossa API na Nuvem
      const response = await fetch(`${API_URL}?url=${encodeURIComponent(url)}&format=${format}`);
      
      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Recebe o arquivo em formato Blob
      const blob = await response.blob();
      
      // Cria um link temporário para forçar o download no navegador
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      
      // Tenta extrair o nome do arquivo do header Content-Disposition
      let filename = "download." + (format === 'audio' ? 'mp3' : 'mp4');
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.includes('filename="')) {
        filename = disposition.split('filename="')[1].split('"')[0];
        // Decode URI component case it's URL encoded by backend
        filename = decodeURIComponent(filename);
      }

      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      statusContainer.innerHTML = `<span style="color: #22c55e;">✓ Download concluído com sucesso!</span>`;
    } catch (error) {
      console.error("Erro no download:", error);
      statusContainer.innerHTML = `<span style="color: #ef4444;">Erro ao baixar: O servidor está offline ou a URL é inválida.</span>`;
    } finally {
      btnVideo.disabled = false;
      btnAudio.disabled = false;
    }
  }

  btnVideo.addEventListener("click", () => startDownload("video"));
  btnAudio.addEventListener("click", () => startDownload("audio"));
});
