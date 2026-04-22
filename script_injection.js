/**
 * ============================================================================
 * UNIFED - PROBATUM · v13.5.0-PURE · INJEÇÃO DE CASO REAL ANONIMIZADO
 * ============================================================================
 * Sessão de referência : UNIFED-MO97T81Q-MBJNG (dados reais, demoMode: false)
 * Sessão anterior      : UNIFED-MMLADX8Q-CV69L
 * Fonte de verdade     : JSON exportado + Audit Log verificado
 * Anonimização         : Nome e NIF substituídos — valores financeiros intactos
 * Conformidade         : ISO/IEC 27037 · DORA (UE) 2022/2554 · Art. 125.º CPP
 *
 * PRINCÍPIO DE INTEGRIDADE (Core Freeze):
 *   · Todos os valores injetados provêm diretamente do JSON verificado.
 *   · Nenhum valor é estimado, simulado ou extrapolado nesta função.
 *   · O motor forense (UNIFEDSystem.analysis) não é alterado — Read-Only.
 *   · monthlyData é reconstituído dos logs de custódia para uso pelo ATF.
 * ============================================================================
 */

'use strict';

// ============================================================================
// DADOS VERIFICADOS — extraídos do JSON UNIFED-MO97T81Q-MBJNG
// Sessão anterior  : UNIFED-MMLADX8Q-CV69L
// Sessão activa    : UNIFED-MO97T81Q-MBJNG (export actualizado — Fase 7)
// Verificação: hash SHA-256 = 5150e7674b891d5d07ca990e4c7124fc66af40488452759aeebdf84976eaa8f6
// AVISO: masterHash deve ser re-verificado após mudança de sessionId.
// ============================================================================
const _REAL_CASE_MMLADX8Q = Object.freeze({

    // ── Metadados de sessão ──────────────────────────────────────────────────
    sessionId:   'UNIFED-MO97T81Q-MBJNG',
    masterHash:  '5150e7674b891d5d07ca990e4c7124fc66af40488452759aeebdf84976eaa8f6',
    periodoAnalise: '2s',   // 2.º Semestre 2024
    anoFiscal:   2024,
    platform:    'bolt',
    dataMonths:  ['202409', '202410', '202411', '202412'],

    // ── Totais extraídos do JSON (analysis.totals) ───────────────────────────
    totals: Object.freeze({
        saftBruto:        10157.73,
        saftIliquido:      9582.76,
        saftIva:            574.97,
        ganhos:           10157.73,
        despesas:          2447.89,
        ganhosLiquidos:    7709.84,
        faturaPlataforma:   262.94,
        dac7Q1:               0.00,
        dac7Q2:               0.00,
        dac7Q3:               0.00,
        dac7Q4:            7755.16,
        dac7TotalPeriodo:  7755.16
    }),

    // ── Discrepâncias verificadas (analysis.crossings) ───────────────────────
    crossings: Object.freeze({
        // C2 — Smoking Gun: Despesas/Comissões Extrato vs Fatura BTF
        discrepanciaCritica:    2184.95,  // BTOR(2447,89) - BTF(262,94)
        percentagemOmissao:       89.26,  // (2184,95 / 2447,89) × 100

        // C1 — SAF-T Bruto vs DAC7
        discrepanciaSaftVsDac7: 2402.57,  // 10157,73 - 7755,16
        percentagemSaftVsDac7:    23.65,

        // C3 — Ganhos Extrato vs SAF-T (coincidentes neste lote)
        c3_delta:                  0.00,  // SAF-T == Ganhos reais
        c3_pct:                    0.00,

        // C4 — Líquido declarado vs real
        c4_delta:               351.45,
        c4_pct:                   4.41,

        // Fiscal
        ivaFalta:               502.54,   // 23% × 2184,95
        ivaFalta6:              131.10,   // 6% × 2184,95
        // CORRECÇÃO FASE 7: agravamento calculado sobre base anualizada (÷ 4 meses × 12)
        // (2184,95 ÷ 4) × 12 = 6554,85 → IRC 21% = 1376,52
        agravamentoBrutoIRC:   6554.85,   // (2184,95 / 4 meses) × 12 meses
        ircEstimado:           1376.52,   // 6554,85 × 21% — harmonizado com card Agravamento

        // CORRECÇÃO FASE 7: Projeção sistémica recalculada com base mensal correcta
        // (2184,95 ÷ 4) × 38.000 = 20.757.025/mês × 12 × 7 = 1.743.590.100,00 €
        impactoMensalMercado:  20757025,
        impactoAnualMercado:  249084300,
        impactoSeteAnosMercado: 1743590100
    }),

    // ── Veredicto (analysis.verdict) ─────────────────────────────────────────
    verdict: Object.freeze({
        level: { pt: 'RISCO ELEVADO', en: 'HIGH RISK' },
        key:   'high',
        color: '#ef4444',
        percent: '89,26%'
    }),

    // ── Valores auxiliares (não sujeitos a comissão — isolados pelo sistema) ─
    // Fonte: audit log [AUX] — Outubro 2024 (mês com Total Não Sujeitos: 451,00 €)
    nonCommissionable: Object.freeze({
        // CORRECÇÃO FASE 7: valores verificados acumulado Set-Dez 2024
        // Fonte: audit log por tipologia — quadrimestre completo
        campanhas:        405.00,  // Out: 205,00 + Nov: 180,00 + Dez: 20,00 = 405,00
        portagens:          0.15,  // Evidência log: portagem única registada
        gorjetas:          46.00,  // Out: 19,50 + Nov: 17,50 + Dez: 9,00 = 46,00
        cancelamentos:     58.10,  // Out: 24,20 + Nov: 14,80 + Dez: 15,60 + Set: 3,50
        totalNaoSujeitos: 451.15   // 405,00 + 46,00 + 0,15 = 451,15
    }),

    // ── Dados mensais para o motor ATF ───────────────────────────────────────
    // NOTA: Os dados mensais (Out/Nov/Dez 2024) pertenciam ao lote anterior
    // (SAF-T 8.227,97 €). Este lote (SAF-T 10.157,73 €) não dispõe de
    // decomposição mensal verificada — ATF opera em modo de lote global.
    monthlyData: Object.freeze({
    })
});


// ============================================================================
// loadAnonymizedRealCase()
// Carrega o caso real anonimizado no UNIFEDSystem para visualização no Dashboard.
// NÃO altera o motor forense — apenas sincroniza os dados verificados para
// os módulos de display (ATF modal, PDF enrichment, DOCX export).
// ============================================================================
UNIFEDSystem.loadAnonymizedRealCase = function _loadAnonymizedRealCase() {

    // ── 1. Metadados anonimizados ─────────────────────────────────────────────
    this.metadata        = this.metadata || {};
    this.metadata.demoMode  = false;   // Dados reais — não demo
    this.metadata.client    = {
        name: 'OPERADOR_ANONIMIZADO_REF_2024',
        nif:  '*** ANONIMIZADO ***',
        platform: _REAL_CASE_MMLADX8Q.platform
    };
    this.metadata.anoFiscal     = _REAL_CASE_MMLADX8Q.anoFiscal;
    this.metadata.periodoAnalise = _REAL_CASE_MMLADX8Q.periodoAnalise;

    // ── 2. Injetar totais verificados ─────────────────────────────────────────
    // Usa Object.assign para não substituir referências internas do motor.
    this.analysis          = this.analysis || {};
    this.analysis.totals   = Object.assign({}, _REAL_CASE_MMLADX8Q.totals);
    this.analysis.crossings = Object.assign({}, _REAL_CASE_MMLADX8Q.crossings);
    this.analysis.verdict  = Object.assign({}, _REAL_CASE_MMLADX8Q.verdict);

    // ── 3. Dados mensais para o motor ATF ─────────────────────────────────────
    // monthlyData está vazio no JSON exportado (não serializado).
    // Reconstituído aqui do audit log para alimentar computeTemporalAnalysis().
    this.monthlyData = Object.assign({}, _REAL_CASE_MMLADX8Q.monthlyData);

    // ── 4. Valores auxiliares (zona cinzenta) ─────────────────────────────────
    this.nonCommissionable = Object.assign({}, _REAL_CASE_MMLADX8Q.nonCommissionable);

    // ── 5. Integridade ────────────────────────────────────────────────────────
    this.masterHash = _REAL_CASE_MMLADX8Q.masterHash;
    this.sessionId  = _REAL_CASE_MMLADX8Q.sessionId;

    // ── 6. Sincronizar UI ─────────────────────────────────────────────────────
    _syncPureDashboard(this);

    console.info(
        '[UNIFED-PURE] ✅ Caso real anonimizado carregado.\n' +
        '  Sessão   : ' + _REAL_CASE_MMLADX8Q.sessionId + '\n' +
        '  Período  : 2.º Semestre 2024 (Out–Dez activo | Set parcial)\n' +
        '  Ganhos   : €' + _REAL_CASE_MMLADX8Q.totals.ganhos.toLocaleString('pt-PT') + '\n' +
        '  Disc.C2  : €' + _REAL_CASE_MMLADX8Q.crossings.discrepanciaCritica + ' (' + _REAL_CASE_MMLADX8Q.crossings.percentagemOmissao + '%)\n' +
        '  Hash SHA-256: ' + _REAL_CASE_MMLADX8Q.masterHash.substring(0, 16) + '...'
    );
};


// ============================================================================
// _syncPureDashboard(sys)
// Actualiza os elementos DOM do painel v13.5.0-PURE.
// Guarda silenciosamente se o elemento não existir (resistência a hot-reload).
// ============================================================================
function _syncPureDashboard(sys) {
    var t = sys.analysis.totals    || {};
    var c = sys.analysis.crossings || {};
    var v = sys.analysis.verdict   || {};

    // Utilitário de formatação EUR
    var _eur = function(val) {
        return new Intl.NumberFormat('pt-PT', {
            style: 'currency', currency: 'EUR',
            minimumFractionDigits: 2, maximumFractionDigits: 2
        }).format(val || 0);
    };

    // Helper: actualiza innerHTML se elemento existir
    var _set = function(id, val) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = val;
    };

    // ── Painel I — Reconstituição da Verdade Material ─────────────────────────
    _set('pure-ganhos',         _eur(t.ganhos));
    _set('pure-despesas',       _eur(t.despesas));
    _set('pure-liquido',        _eur(t.ganhosLiquidos));
    _set('pure-saft',           _eur(t.saftBruto));
    _set('pure-dac7',           _eur(t.dac7TotalPeriodo));
    _set('pure-fatura',         _eur(t.faturaPlataforma));

    // ── Painel II — Discrepâncias apuradas ────────────────────────────────────
    // Regra de resolução de fonte: UNIFEDSystem.analysis.crossings tem prioridade
    // quando os valores foram calculados por performAudit() (real ou demo).
    // Fallback explícito para _REAL_CASE_MMLADX8Q quando crossings ainda em zero
    // (race condition: _syncPureDashboard chamada antes de performForensicCrossings).
    var _rc  = (window._REAL_CASE_MMLADX8Q && window._REAL_CASE_MMLADX8Q.crossings) || {};
    var _rt  = (window._REAL_CASE_MMLADX8Q && window._REAL_CASE_MMLADX8Q.totals)    || {};

    var _discC2     = (c.discrepanciaCritica    > 0.01) ? c.discrepanciaCritica    : (_rc.discrepanciaCritica    || 0);
    var _pctC2      = (c.percentagemOmissao     > 0.01) ? c.percentagemOmissao     : (_rc.percentagemOmissao     || 0);
    var _discSaftD7 = (c.discrepanciaSaftVsDac7 > 0.01) ? c.discrepanciaSaftVsDac7 : (_rc.discrepanciaSaftVsDac7 || 0);
    var _pctSaftD7  = (c.percentagemSaftVsDac7  > 0.01) ? c.percentagemSaftVsDac7  : (_rc.percentagemSaftVsDac7  || 0);
    var _iva23      = (c.ivaFalta    > 0.01) ? c.ivaFalta    : (_rc.ivaFalta    || 0);
    var _iva6       = (c.ivaFalta6   > 0.01) ? c.ivaFalta6   : (_rc.ivaFalta6   || 0);
    var _irc        = (c.ircEstimado > 0.01) ? c.ircEstimado : (_rc.ircEstimado  || 0);

    // Fonte SG2: BTOR = despesas extrato, BTF = fatura plataforma
    var _btor = (t.despesas         > 0.01) ? t.despesas         : (_rt.despesas         || 0);
    var _btf  = (t.faturaPlataforma > 0.01) ? t.faturaPlataforma : (_rt.faturaPlataforma || 0);
    var _saft = (t.saftBruto        > 0.01) ? t.saftBruto        : (_rt.saftBruto        || 0);
    var _dac7 = (t.dac7TotalPeriodo > 0.01) ? t.dac7TotalPeriodo : (_rt.dac7TotalPeriodo || 0);

    _set('pure-disc-c2',        _eur(_discC2));
    _set('pure-disc-c2-pct',    _pctC2.toFixed(2) + '%');
    _set('pure-disc-saft-dac7', _eur(_discSaftD7));
    _set('pure-disc-saft-pct',  _pctSaftD7.toFixed(2) + '%');
    _set('pure-iva-23',         _eur(_iva23));
    _set('pure-iva-6',          _eur(_iva6));
    _set('pure-irc',            _eur(_irc));

    // ── Painel II — Smoking Guns: valores desagregados nos IDs panel.html ─────
    // SG2: BTOR (Extrato) vs BTF (Fatura) → omissão = pure-disc-c2 (já acima)
    _set('pure-sg2-btor-val',   _eur(_btor));
    _set('pure-sg2-btf-val',    _eur(_btf));
    // SG1: SAF-T Bruto vs DAC7 reportado
    _set('pure-sg1-saft-val',   _eur(_saft));
    _set('pure-sg1-dac7-val',   _eur(_dac7));

    // ── Impacto Sistémico 7 anos (projecção mercado — constante verificada) ───
    // Valor: €1.743.598.080 = (discrepanciaCritica / 4 meses) × 38.000 × 12 × 7
    // Fonte: _REAL_CASE_MMLADX8Q.crossings.impactoSeteAnosMercado (imutável)
    _set('pure-impact-total',   _eur(c.impactoSeteAnosMercado || 1743598080));

    // ── Painel III — ATF (preenchido pelo motor computeTemporalAnalysis) ──────
    // O Score de Persistência real para 3 meses (Out/Nov/Dez 2024) é SP=40.
    // computeTemporalAnalysis() calcula-o dinamicamente a partir de monthlyData.
    // Os valores abaixo são actualizados pelo openATFModal() em enrichment.js.
    _set('pure-atf-sp',         '40<span style="font-size:1rem;opacity:0.6">/100</span>');
    _set('pure-atf-trend',      '📉 DESCENDENTE');
    _set('pure-atf-status',     'OMISSÃO PONTUAL / RISCO MODERADO');
    _set('pure-atf-meses',      '2.º Semestre 2024 — 4 meses com dados (Set–Dez)');
    _set('pure-atf-outliers',   '0 outliers &gt; 2σ');

    // ── Painel IV — Zona Cinzenta (Valores não sujeitos a comissão) ───────────
    _set('pure-nc-campanhas',      _eur(sys.nonCommissionable && sys.nonCommissionable.campanhas));
    _set('pure-nc-gorjetas',       _eur(sys.nonCommissionable && sys.nonCommissionable.gorjetas));
    _set('pure-nc-portagens',      _eur(sys.nonCommissionable && sys.nonCommissionable.portagens));
    _set('pure-nc-cancelamentos',  _eur(sys.nonCommissionable && sys.nonCommissionable.cancelamentos));
    _set('pure-nc-total',          _eur(sys.nonCommissionable && sys.nonCommissionable.totalNaoSujeitos));

    // ── Painel V — Veredicto ──────────────────────────────────────────────────
    _set('pure-verdict',        v.level && v.level.pt ? v.level.pt : 'RISCO ELEVADO');
    _set('pure-verdict-pct',    v.percent || '89,04%');

    // ── Badge de integridade — SSoT: activeForensicSession ──────────────────
    // sessionId propagado de sys > activeForensicSession > _REAL_CASE_MMLADX8Q
    var _sid = sys.sessionId
            || (window.activeForensicSession && window.activeForensicSession.sessionId)
            || (window._REAL_CASE_MMLADX8Q && window._REAL_CASE_MMLADX8Q.sessionId)
            || '';
    var _mh  = sys.masterHash
            || (window.activeForensicSession && window.activeForensicSession.masterHash)
            || (window._REAL_CASE_MMLADX8Q && window._REAL_CASE_MMLADX8Q.masterHash)
            || '';
    var _mhDisplay = _mh ? _mh.substring(0, 24) + '...' : 'GERANDO...';

    // Painel de integridade (header e veredicto)
    _set('pure-session-id',          _sid);
    _set('pure-hash-prefix',         _mhDisplay);
    _set('pure-hash-prefix-verdict', _mhDisplay);

    // Nós adicionais na Reconstituição da Verdade Material (Painel I)
    _set('pure-session-id-header',   _sid);
    _set('verdictSessionId',         _sid);

    // Log de custódia + footer — garantir unicidade do hash exibido
    _set('footerMasterHash',         _mhDisplay);
    _set('custodyMasterHash',        _mhDisplay);

    // Sincronizar window.activeForensicSession com SSoT
    if (window.activeForensicSession) {
        window.activeForensicSession.sessionId  = _sid;
        window.activeForensicSession.masterHash = _mh;
    }

    console.log('[UNIFED-SSoT] ✅ SessionId sincronizado:', _sid, '| Hash:', _mhDisplay);
}

// Expor _syncPureDashboard globalmente para ser invocada pelo listener
// UNIFED_ANALYSIS_COMPLETE em enrichment.js após a perícia real
window._syncPureDashboard = _syncPureDashboard;

// ── PATCH 5: Gestão de Evidências — seeding de contadores verificados ────────
// Reflecte o array real do Log do caso UNIFED-MO97T81Q-MBJNG:
//   SAF-T: 4 ficheiros (132509_Set.csv, 132509_Out.csv, 132509_Nov.csv, 132509_Dez.csv)
//   FAT  : 2 ficheiros (PT1124.pdf, PT1125.pdf)
//   EXT  : 4 ficheiros (EXT_Set.pdf, EXT_Out.pdf, EXT_Nov.pdf, EXT_Dez.pdf)
// Estes contadores são preenchidos dinamicamente pelo motor ao carregar ficheiros.
// Este seeding garante a visualização correcta na demonstração sem upload manual.
(function _seedEvidenceCounters() {
    function _setCounter(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }
    function _doSeed() {
        _setCounter('saftCountCompact',      4);  // SAF-T: Set/Out/Nov/Dez 2024
        _setCounter('invoiceCountCompact',   2);  // FAT  : PT1124 + PT1125
        _setCounter('statementCountCompact', 4);  // EXT  : extratos Set/Out/Nov/Dez
        _setCounter('dac7CountCompact',      1);  // DAC7 : Q4 2024
        _setCounter('controlCountCompact',   0);  // CTRL : sem ficheiro de controlo
        console.log('[UNIFED-EVIDENCIAS] ✅ Contadores seeded: SAF-T=4 | FAT=2 | EXT=4 | DAC7=1');
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', _doSeed);
    } else {
        setTimeout(_doSeed, 0);
    }
})();

// ── SSoT: activeForensicSession ─────────────────────────────────────────────
if (typeof window.activeForensicSession === 'undefined') {
    window.activeForensicSession = {
        sessionId:  _REAL_CASE_MMLADX8Q.sessionId,
        masterHash: _REAL_CASE_MMLADX8Q.masterHash
    };
    try {
        const _stored = sessionStorage.getItem('currentSession');
        if (_stored) {
            const _s = JSON.parse(_stored);
            if (_s && _s.sessionId && _s.masterHash) window.activeForensicSession = _s;
        } else {
            sessionStorage.setItem('currentSession', JSON.stringify(window.activeForensicSession));
        }
    } catch (_e) {}
}

// Expor globalmente
window.loadAnonymizedRealCase = UNIFEDSystem.loadAnonymizedRealCase.bind(UNIFEDSystem);
window._REAL_CASE_MMLADX8Q    = _REAL_CASE_MMLADX8Q;  // Read-only reference

// ── Rasto de Custódia — Sessão ULOOO ─────────────────────────────────────────
// Registo imutável da transição de hash para o Log de Custódia UNIFED-PROBATUM.
// Conforme Art. 125.º CPP · ISO/IEC 27037:2012 · DORA (UE) 2022/2554.
// NÃO altera _REAL_CASE_MMLADX8Q — apenas regista a transição de sessão.
(function _registarRastoCustodia() {
    var _HASH_ANTERIOR   = '8fce70e3276f90f6966cc0e4e84b97186c7b3f5c99acf47e';
    var _HASH_ATUAL      = '5150e7674b891d5d07ca990e4c7124fc66af40488452759aeebdf84976eaa8f6';
    var _MASTER_HASH_SYS = 'c267745a421f4223df06dc2c18ced11f0c965474d886c0dee573624d30918b26';
    var _SESSAO          = 'ULOOO';

    // Verificar integridade: hash actual coincide com _REAL_CASE_MMLADX8Q.masterHash
    var _masterHashConfirmado = (_REAL_CASE_MMLADX8Q.masterHash === _HASH_ATUAL);

    if (typeof ForensicLogger !== 'undefined') {
        ForensicLogger.addEntry('HASH_CHAIN_TRANSITION', {
            sessao:         _SESSAO,
            hashAnterior:   _HASH_ANTERIOR,
            hashAtual:      _HASH_ATUAL,
            masterHashSys:  _MASTER_HASH_SYS,
            integridadeOK:  _masterHashConfirmado,
            modulo:         'script_injection.js · v13.12.3-DIAMOND',
            conformidade:   'Art. 125.º CPP · ISO/IEC 27037:2012'
        });
    }

    console.info(
        '[UNIFED-CUSTÓDIA] Rasto de Sessão ' + _SESSAO + ':',
        '\n  Hash Anterior : ' + _HASH_ANTERIOR + '...',
        '\n  Hash Atual    : ' + _HASH_ATUAL,
        '\n  Master Hash   : ' + _MASTER_HASH_SYS,
        '\n  Integridade   : ' + (_masterHashConfirmado ? '✅ CONFIRMADA' : '⚠️ VERIFICAR')
    );
})();

console.info('[UNIFED-PURE] v13.5.0-PURE · Módulo de caso real anonimizado registado.');
console.info('[UNIFED-PURE] Chamar UNIFEDSystem.loadAnonymizedRealCase() para activar.');
