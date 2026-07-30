import"./modulepreload-polyfill-Dezn_h7o.js";import{t as e}from"./firebase-QS_LFa8H.js";async function t(){let t=document.getElementById(`tableContainer`),n=document.getElementById(`totalClicks`),r=document.getElementById(`dbStatus`);try{let i=await e();if(i.length>0&&i[0].userAgent===`Mock`?(r.textContent=`Modo Simulação (Aguardando Chaves)`,r.style.color=`#facc15`):r.textContent=`Online (Firebase)`,n.textContent=i.length,i.length===0){t.innerHTML=`<div class="loading">Nenhum clique registrado ainda.</div>`;return}let a=`
          <table>
            <thead>
              <tr>
                <th>Data e Hora</th>
                <th>Ação / Botão</th>
                <th>Página de Origem</th>
              </tr>
            </thead>
            <tbody>
        `;i.forEach(e=>{let t=e.timestamp instanceof Date?e.timestamp.toLocaleString(`pt-BR`):new Date().toLocaleString(`pt-BR`);a+=`
            <tr>
              <td>${t}</td>
              <td><span class="badge">${e.buttonName}</span></td>
              <td style="color: var(--text-sec);">${e.sourcePage}</td>
            </tr>
          `}),a+=`
            </tbody>
          </table>
        `,t.innerHTML=a}catch(e){console.error(e),t.innerHTML=`<div class="loading" style="color: #ef4444;">Erro ao carregar os dados. Verifique o console.</div>`,r.textContent=`Erro`,r.style.color=`#ef4444`}}t();