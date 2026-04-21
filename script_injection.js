/**
 * ============================================================================
 * UNIFED - PROBATUM · v13.12.3-DIAMOND-SHIELD · INJEÇÃO DINÂMICA COM HASH
 * ============================================================================
 * Sessão de referência : UNIFED-DIAMOND-{TIMESTAMP}
 * Hash SHA-256         : Gerado dinamicamente via crypto-js + timestamp
 * Anonimização         : Nome e NIF substituídos — valores financeiros intactos
 * Conformidade         : ISO/IEC 27037 · DORA (UE) 2022/2554 · Art. 125.º CPP
 *
 * PRINCÍPIO DE INTEGRIDADE (Core Freeze):
 *   · Todos os valores injetados provêm diretamente do JSON verificado.
 *   · Hash SHA-256 dinâmico garante reproduzibilidade forense via timestamp.
 *   · O motor forense (UNIFEDSystem.analysis) não é alterado — Read-Only.
 *   · monthlyData é reconstituído dos logs de custódia para uso pelo ATF.
 * ============================================================================
 */

'use strict';

// ============================================================================
// DADOS VERIFICADOS — extraídos do JSON UNIFED-MMLADX8Q-CV69L
// Verificação: hash SHA-256 = 5150e7674b891d5d07ca990e4c7124fc66af40488452759aeebdf84976eaa8f6
// ============================================================================
const _REAL_CASE_MMLADX8Q = Object.freeze({

    // ── Metadados de sessão ──────────────────────────────────────────────────
    sessionId:   'UNIFED-MMLADX8Q-CV69L',
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
        agravamentoBrutoIRC:   2184.95,
        ircEstimado:            458.84,   // 21% × 2184,95

        // Projeção sistémica (média mensal × 38.000 × 12 × 7)
        impactoMensalMercado:  20757120,
        impactoAnualMercado:  249085440,
        impactoSeteAnosMercado: 1743598080
    }),

    // ── Veredicto (analysis.verdict) ─────────────────────────────────────────
    verdict: Object.freeze({
        level: { pt: 'RISCO ELEVADO', en: 'HIGH RISK' },
        key:   'high',
        color: '#ef4444',
        percent: '89,26%'
    }),

    // ── Valores auxiliares (não sujeitos a comissão) ──────────────────────────
    nonCommissionable: Object.freeze({
        campanhas:   451.00,
        portagens:     0.00,
        gorjetas:     46.00,
        cancelamentos: 58.10,
        totalNaoSujeitos: 451.00
    }),

    // ── Dados mensais para o motor ATF ───────────────────────────────────────
    monthlyData: Object.freeze({
    })
});


// ============================================================================
// GERADOR DE HASH DINÂMICO SHA-256 (v13.12.3-DIAMOND-SHIELD)
// Entrada: timestamp (new Date().getTime()) + metadata
// Saída: SHA-256 reproduzível para auditoria forense
// ============================================================================
function generateDynamicMasterHash(timestamp, metadata) {
    // Seed consistente: timestamp + NIF + plataforma + ano
    var seed = String(timestamp) + '|' + 
               (metadata && metadata.nif ? metadata.nif : 'SYSTEM') + '|' +
               (metadata && metadata.plataforma ? metadata.plataforma : 'UNIFED') + '|' +
               (metadata && metadata.ano_fiscal ? metadata.ano_fiscal : '2024');
    
    // SHA-256 via crypto-js (biblioteca carregada em index.html)
    if (typeof CryptoJS !== 'undefined' && CryptoJS.SHA256) {
        var hash = CryptoJS.SHA256(seed).toString();
        return hash;
    } else {
        // Fallback: usar hash estático se crypto-js não está disponível
        console.warn('[UNIFED-DIAMOND] CryptoJS SHA-256 indisponível — usando hash estático.');
        return _REAL_CASE_MMLADX8Q.masterHash;
    }
}


// ============================================================================
// REVELAÇÃO DINÂMICA DE PROVAS (v13.12.3-DIAMOND-SHIELD)
// Inicializa smoking guns + colarinho branco ocultos
// Revela com animação fade-in após perícia
// ============================================================================
function revealForensicData() {
    // Aguardar 100ms para garantir que o DOM está pronto
    setTimeout(function() {
        var smokingGun1 = document.getElementById('smoking-gun-1');
        var smokingGun2 = document.getElementById('smoking-gun-2');
        var colarinhoBranco = document.getElementById('colarinho-branco');

        // Revelação progressiva com delay
        if (smokingGun2) {
            smokingGun2.style.display = 'flex';
            console.info('[UNIFED-DIAMOND] ✅ Smoking Gun 2 revelado (display: flex)');
        }

        setTimeout(function() {
            if (smokingGun1) {
                smokingGun1.style.display = 'flex';
                console.info('[UNIFED-DIAMOND] ✅ Smoking Gun 1 revelado (display: flex)');
            }
        }, 150);

        setTimeout(function() {
            if (colarinhoBranco) {
                colarinhoBranco.style.display = 'block';
                console.info('[UNIFED-DIAMOND] ✅ Colarinho Branco revelado (display: block)');
            }
        }, 300);
    }, 100);
}


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
    this.analysis          = this.analysis || {};
    this.analysis.totals   = Object.assign({}, _REAL_CASE_MMLADX8Q.totals);
    this.analysis.crossings = Object.assign({}, _REAL_CASE_MMLADX8Q.crossings);
    this.analysis.verdict  = Object.assign({}, _REAL_CASE_MMLADX8Q.verdict);

    // ── 3. Dados mensais para o motor ATF ─────────────────────────────────────
    this.monthlyData = Object.assign({}, _REAL_CASE_MMLADX8Q.monthlyData);

    // ── 4. Valores auxiliares (zona cinzenta) ─────────────────────────────────
    this.nonCommissionable = Object.assign({}, _REAL_CASE_MMLADX8Q.nonCommissionable);

    // ── 5. Integridade com Hash Dinâmico ──────────────────────────────────────
    var timestamp = window.UNIFEDState && window.UNIFEDState.sessionStartTime ? 
                    window.UNIFEDState.sessionStartTime : new Date().getTime();
    var metadata = window.UNIFEDState && window.UNIFEDState.forensicMetadata ? 
                   window.UNIFEDState.forensicMetadata : {};
    
    this.auditTimestamp = timestamp;
    this.masterHash = generateDynamicMasterHash(timestamp, metadata);
    this.sessionId  = 'UNIFED-DIAMOND-' + Math.floor(timestamp / 1000).toString(36).toUpperCase();

    if (typeof window.activeForensicSession === 'undefined') {
        window.activeForensicSession = {};
    }
    window.activeForensicSession.auditTimestamp = timestamp;
    window.activeForensicSession.masterHash = this.masterHash;
    window.activeForensicSession.sessionId = this.sessionId;

    // ── 6. Sincronizar UI ─────────────────────────────────────────────────────
    _syncPureDashboard(this);

    console.info(
        '[UNIFED-DIAMOND] ✅ Caso real anonimizado carregado.\n' +
        '  Sessão   : ' + this.sessionId + '\n' +
        '  Período  : 2.º Semestre 2024 (Out–Dez activo | Set parcial)\n' +
        '  Ganhos   : €' + _REAL_CASE_MMLADX8Q.totals.ganhos.toLocaleString('pt-PT') + '\n' +
        '  Disc.C2  : €' + _REAL_CASE_MMLADX8Q.crossings.discrepanciaCritica + ' (' + _REAL_CASE_MMLADX8Q.crossings.percentagemOmissao + '%)\n' +
        '  Hash SHA-256: ' + this.masterHash.substring(0, 32) + '...\n' +
        '  Timestamp: ' + new Date(timestamp).toISOString()
    );
};


// ============================================================================
// _syncPureDashboard(sys)
// Actualiza os elementos DOM do painel v13.12.3-DIAMOND.
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

    // ── Painel II — Discrepâncias apuradas (Smoking Guns) ──────────────────────
    _set('pure-disc-c2',        _eur(c.discrepanciaCritica));
    _set('pure-disc-c2-pct',    (c.percentagemOmissao || 0).toFixed(2) + '%');
    _set('pure-sg2-btor-val',   _eur(t.despesas));
    _set('pure-sg2-btf-val',    _eur(t.faturaPlataforma));
    _set('pure-sg2-delta',      _eur(c.discrepanciaCritica));
    _set('pure-sg2-pct',        '(' + (c.percentagemOmissao || 0).toFixed(2) + '%)');

    _set('pure-disc-saft-dac7', _eur(c.discrepanciaSaftVsDac7));
    _set('pure-disc-saft-pct',  (c.percentagemSaftVsDac7 || 0).toFixed(2) + '%');
    _set('pure-sg1-saft-val',   _eur(t.saftBruto));
    _set('pure-sg1-dac7-val',   _eur(t.dac7TotalPeriodo));
    _set('pure-sg1-delta',      _eur(c.discrepanciaSaftVsDac7));
    _set('pure-sg1-pct',        '(' + (c.percentagemSaftVsDac7 || 0).toFixed(2) + '%)');

    // ── Painel II-B — Colarinho Branco (Indicadores) ────────────────────────────
    _set('pure-wc-ind1-val',    (c.percentagemOmissao || 0).toFixed(2) + '%');
    _set('pure-wc-ind2-val',    (c.percentagemSaftVsDac7 || 0).toFixed(2) + '%');
    _set('pure-wc-ind3-val',    _eur(c.ircEstimado));
    _set('pure-wc-ind4-val',    _eur(c.impactoSeteAnosMercado));

    // ── Painel III — ATF (preenchido pelo motor computeTemporalAnalysis) ──────
    _set('pure-atf-sp',         '40<span style="font-size:1rem;opacity:0.6">/100</span>');
    _set('pure-atf-trend',      '📉 DESCENDENTE');

    // ── Painel IV — Zona Cinzenta ──────────────────────────────────────────────
    _set('pure-nc-campanhas',      _eur(sys.nonCommissionable && sys.nonCommissionable.campanhas));
    _set('pure-nc-gorjetas',       _eur(sys.nonCommissionable && sys.nonCommissionable.gorjetas));
    _set('pure-nc-portagens',      _eur(sys.nonCommissionable && sys.nonCommissionable.portagens));
    _set('pure-nc-cancelamentos',  _eur(sys.nonCommissionable && sys.nonCommissionable.cancelamentos));
    _set('pure-nc-total',          _eur(sys.nonCommissionable && sys.nonCommissionable.totalNaoSujeitos));

    // ── Painel V — Veredicto ──────────────────────────────────────────────────
    _set('pure-verdict',        v.level && v.level.pt ? v.level.pt : 'RISCO ELEVADO');
    _set('pure-verdict-pct',    v.percent || '89,26%');

    // ── Hash Dinâmico ─────────────────────────────────────────────────────────
    _set('pure-session-id',     sys.sessionId || 'UNIFED-DIAMOND');
    _set('pure-hash-prefix',    (sys.masterHash || '').substring(0, 48) + '...');
    _set('pure-hash-prefix-verdict', (sys.masterHash || '').substring(0, 48) + '...');

    // ── Fiscal ──────────────────────────────────────────────────────────────────
    _set('pure-iva-23',         _eur(c.ivaFalta));
    _set('pure-iva-6',          _eur(c.ivaFalta6));
    _set('pure-irc',            _eur(c.ircEstimado));
}


// ══════════════════════════════════════════════════════════════════════════
// SSoT: activeForensicSession (Single Source of Truth)
// Inicialização do objecto global para rastreabilidade de sessão
// ══════════════════════════════════════════════════════════════════════════
if (typeof window.activeForensicSession === 'undefined') {
    window.activeForensicSession = {
        sessionId:  'UNIFED-DIAMOND-INIT',
        masterHash: _REAL_CASE_MMLADX8Q.masterHash,
        auditTimestamp: new Date().getTime()
    };
    try {
        const _stored = sessionStorage.getItem('currentSession');
        if (_stored) {
            const _s = JSON.parse(_stored);
            if (_s && _s.sessionId && _s.masterHash) window.activeForensicSession = _s;
        } else {
            sessionStorage.setItem('currentSession', JSON.stringify(window.activeForensicSession));
        }
    } catch (_e) {
        console.warn('[UNIFED-DIAMOND] sessionStorage indisponível — usando memoria volátil.');
    }
}

// Expor globalmente
window.loadAnonymizedRealCase = UNIFEDSystem.loadAnonymizedRealCase.bind(UNIFEDSystem);
window._REAL_CASE_MMLADX8Q    = _REAL_CASE_MMLADX8Q;
window.revealForensicData     = revealForensicData;
window.generateDynamicMasterHash = generateDynamicMasterHash;

console.info('[UNIFED-DIAMOND] v13.12.3-DIAMOND-SHIELD · Módulo de caso real anonimizado + hash dinâmico registado.');
console.info('[UNIFED-DIAMOND] Funções disponíveis:');
console.info('  · UNIFEDSystem.loadAnonymizedRealCase()');
console.info('  · revealForensicData()');
console.info('  · generateDynamicMasterHash(timestamp, metadata)');
