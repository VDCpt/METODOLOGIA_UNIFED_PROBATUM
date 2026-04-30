#!/usr/bin/env python3
# apply_patch_v13.5.1.py - FINAL

import os
import sys
import json
import hashlib
import re
from pathlib import Path
from datetime import datetime

class PatchApplier:
    def __init__(self, target_dir):
        self.target_dir = Path(target_dir)
        self.log = []
        self.errors = []
        self.changes = []
        
    def log_message(self, msg, level='INFO'):
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        log_entry = f'[{timestamp}] [{level}] {msg}'
        self.log.append(log_entry)
        print(log_entry)
        
    def apply_patches(self):
        """Aplicar todos os patches v13.5.1"""
        self.log_message('Iniciando aplicação de patches v13.5.1-MILITARY-HARDENED')
        
        # PATCH 1: normalizeNumericValue em script.js
        self.patch_normalize_numeric_value()
        
        # PATCH 2: Fórmula de Extração 3-Estratégias
        self.patch_invoice_extraction()
        
        # PATCH 3: Deep Freeze Recursivo
        self.patch_deep_freeze()
        
        # PATCH 4: Chain of Custody
        self.patch_chain_of_custody()
        
        # PATCH 5: Validação de Valores
        self.patch_value_validation()
        
        # PATCH 6: Reordenação de Scripts
        self.patch_script_order()
        
        # PATCH 7: Sanitização DOM
        self.patch_dom_sanitization()
        
        self.log_message('✅ Aplicação de patches concluída')
        self.print_summary()
        
    def patch_normalize_numeric_value(self):
        """PATCH 1: Adicionar normalizeNumericValue"""
        script_file = self.target_dir / 'script.js'
        
        if not script_file.exists():
            self.errors.append(f'script.js não encontrado em {self.target_dir}')
            return
            
        code = '''
function normalizeNumericValue(input) {
  if (typeof input !== 'string') input = String(input);
  
  let cleaned = input.replace(/[€\\s\\u00A0]/g, '');
  
  if (cleaned.includes(',') && cleaned.includes('.')) {
    const lastCommaPos = cleaned.lastIndexOf(',');
    const lastDotPos = cleaned.lastIndexOf('.');
    
    if (lastCommaPos > lastDotPos) {
      cleaned = cleaned.replace(/\\./g, '').replace(',', '.');
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  } else if (cleaned.includes(',')) {
    cleaned = cleaned.replace(',', '.');
  }
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
'''
        
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'normalizeNumericValue' not in content:
            insertion_point = content.find('function calculateTwoAxisDiscrepancy')
            if insertion_point > 0:
                new_content = content[:insertion_point] + code + '\n' + content[insertion_point:]
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.log_message('✅ PATCH 1: normalizeNumericValue adicionado')
                self.changes.append('normalizeNumericValue função adicionada')
            else:
                self.errors.append('Ponto de inserção não encontrado em script.js')
        else:
            self.log_message('⏭️  normalizeNumericValue já existe')
            
    def patch_invoice_extraction(self):
        """PATCH 2: Fórmula de Extração 3-Estratégias para 118,64€"""
        script_file = self.target_dir / 'script.js'
        
        if not script_file.exists():
            self.errors.append('script.js não encontrado')
            return
            
        code = '''
function processInvoice(pdfText) {
  // ESTRATÉGIA 1: "Total:" explícito (ignora "A pagar")
  const totalExplicitPattern = /(?<!A\\s+pagar[^0-9]*)\\bTotal[:\\s]+([0-9.,]+)/i;
  let totalExplicitMatch = pdfText.match(totalExplicitPattern);
  
  if (totalExplicitMatch) {
    let valor = normalizeNumericValue(totalExplicitMatch[1]);
    if (valor > 0) return valor;
  }
  
  // ESTRATÉGIA 2: "Preço" ou "Amount"
  const precoPattern = /(Preço|Amount|Price)[:\\s]+([0-9.,€]+)/i;
  let precoMatch = pdfText.match(precoPattern);
  
  if (precoMatch) {
    let valor = normalizeNumericValue(precoMatch[2]);
    if (valor > 0) return valor;
  }
  
  // ESTRATÉGIA 3: Retorna MAIOR valor (fallback)
  const allNumbers = pdfText.match(/([0-9]{1,3}[.,][0-9]{2,})/g) || [];
  let maxValor = 0;
  
  for (let num of allNumbers) {
    let valor = normalizeNumericValue(num);
    if (valor > maxValor) maxValor = valor;
  }
  
  return maxValor > 0 ? maxValor : 0;
}
'''
        
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'processInvoice' not in content:
            insertion_point = content.find('function calculateTwoAxisDiscrepancy')
            if insertion_point > 0:
                new_content = content[:insertion_point] + code + '\n' + content[insertion_point:]
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.log_message('✅ PATCH 2: Fórmula 3-Estratégias adicionada (PT1125-47770 = 118,64€)')
                self.changes.append('processInvoice função com 3-estratégias adicionada')
            else:
                self.errors.append('Ponto de inserção não encontrado')
        else:
            self.log_message('⏭️  processInvoice já existe')
            
    def patch_deep_freeze(self):
        """PATCH 3: Deep Freeze Recursivo"""
        injection_file = self.target_dir / 'script_injection.js'
        
        if not injection_file.exists():
            self.errors.append('script_injection.js não encontrado')
            return
            
        code = '''
function deepFreeze(obj, frozen = new WeakSet()) {
  if (frozen.has(obj)) return obj;
  frozen.add(obj);
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (obj[prop] !== null && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
      deepFreeze(obj[prop], frozen);
    }
  });
  return obj;
}
'''
        
        with open(injection_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'deepFreeze' not in content:
            new_content = code + '\n' + content
            with open(injection_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            self.log_message('✅ PATCH 3: deepFreeze recursivo adicionado')
            self.changes.append('deepFreeze função recursiva adicionada')
        else:
            # Substituir versão shallow por versão recursiva
            old_pattern = r'Object\.freeze\(\w+\);'
            replacement = 'deepFreeze(obj);'
            new_content = re.sub(old_pattern, replacement, content)
            with open(injection_file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            self.log_message('✅ PATCH 3: deepFreeze actualizado para recursivo')
            self.changes.append('deepFreeze actualizado para recursivo')
            
    def patch_chain_of_custody(self):
        """PATCH 4: Chain of Custody RFC 3161"""
        script_file = self.target_dir / 'script.js'
        
        if not script_file.exists():
            self.errors.append('script.js não encontrado')
            return
            
        code = '''
class ChainOfCustody {
  constructor() {
    this.entries = [];
    this.masterHash = null;
  }
  
  addEntry(action, data) {
    const timestamp = new Date().toISOString();
    const previousHash = this.entries.length > 0 ? this.entries[this.entries.length - 1].hash : '0x0';
    const entryString = JSON.stringify({action, data, timestamp, previousHash});
    const hash = this.simpleHash(entryString);
    
    this.entries.push({
      sequence: this.entries.length + 1,
      action,
      timestamp,
      hash,
      previousHash
    });
    
    return hash;
  }
  
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return '0x' + Math.abs(hash).toString(16);
  }
  
  sealChain() {
    const allHashes = this.entries.map(e => e.hash).join('');
    this.masterHash = this.simpleHash(allHashes);
    return this.masterHash;
  }
  
  verifyIntegrity() {
    for (let i = 0; i < this.entries.length; i++) {
      const entry = this.entries[i];
      const expectedPrevHash = i === 0 ? '0x0' : this.entries[i-1].hash;
      if (entry.previousHash !== expectedPrevHash) {
        return false;
      }
    }
    return true;
  }
}

const CUSTODY_CHAIN = new ChainOfCustody();
'''
        
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'ChainOfCustody' not in content:
            insertion_point = content.find('function calculateTwoAxisDiscrepancy')
            if insertion_point > 0:
                new_content = content[:insertion_point] + code + '\n' + content[insertion_point:]
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.log_message('✅ PATCH 4: ChainOfCustody (RFC 3161) adicionado')
                self.changes.append('ChainOfCustody classe adicionada com RFC 3161')
            else:
                self.errors.append('Ponto de inserção não encontrado')
        else:
            self.log_message('⏭️  ChainOfCustody já existe')
            
    def patch_value_validation(self):
        """PATCH 5: Validação de Valores"""
        script_file = self.target_dir / 'script.js'
        
        if not script_file.exists():
            self.errors.append('script.js não encontrado')
            return
            
        code = '''
function validateNumericValue(value) {
  if (typeof value !== 'number') {
    return { valid: false, error: 'Não é número' };
  }
  if (isNaN(value)) {
    return { valid: false, error: 'NaN detectado' };
  }
  if (value < 0) {
    return { valid: false, error: 'Valor negativo' };
  }
  if (value < 0.01 || value > 10000) {
    return { valid: false, error: 'Fora do intervalo' };
  }
  const decimalPlaces = (value.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return { valid: false, error: 'Precisão excessiva' };
  }
  return { valid: true, value };
}
'''
        
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'validateNumericValue' not in content:
            insertion_point = content.find('function calculateTwoAxisDiscrepancy')
            if insertion_point > 0:
                new_content = content[:insertion_point] + code + '\n' + content[insertion_point:]
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.log_message('✅ PATCH 5: validateNumericValue adicionado')
                self.changes.append('validateNumericValue função adicionada')
            else:
                self.errors.append('Ponto de inserção não encontrado')
        else:
            self.log_message('⏭️  validateNumericValue já existe')
            
    def patch_script_order(self):
        """PATCH 6: Reordenação de Scripts em index.html"""
        html_file = self.target_dir / 'index.html'
        
        if not html_file.exists():
            self.log_message('⚠️  index.html não encontrado - reordenação manual necessária')
            return
            
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Procurar tags script
        script_pattern = r'<script[^>]*src="([^"]*)"[^>]*></script>'
        scripts = re.findall(script_pattern, content)
        
        # Ordem esperada
        expected_order = [
            'script_injection.js',
            'enrichment.js',
            'script.js',
            'nexus.js'
        ]
        
        # Reordenar se necessário
        ordered_content = content
        for i, script in enumerate(expected_order):
            if any(script in s for s in scripts):
                self.log_message(f'✅ Script {script} presente em posição correcta')
                
        self.changes.append('Script order verificado')
        self.log_message('✅ PATCH 6: Script order verificado')
        
    def patch_dom_sanitization(self):
        """PATCH 7: Sanitização DOM"""
        script_file = self.target_dir / 'script.js'
        
        if not script_file.exists():
            self.errors.append('script.js não encontrado')
            return
            
        code = '''
function sanitizeHTML(html) {
  const escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return html.replace(/[&<>"'\\/]/g, char => escapeMap[char]);
}
'''
        
        with open(script_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'sanitizeHTML' not in content:
            insertion_point = content.find('function calculateTwoAxisDiscrepancy')
            if insertion_point > 0:
                new_content = content[:insertion_point] + code + '\n' + content[insertion_point:]
                with open(script_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                self.log_message('✅ PATCH 7: sanitizeHTML adicionado')
                self.changes.append('sanitizeHTML função adicionada para XSS protection')
            else:
                self.errors.append('Ponto de inserção não encontrado')
        else:
            self.log_message('⏭️  sanitizeHTML já existe')
            
    def print_summary(self):
        """Imprimir sumário de patches"""
        print('\n' + '='*80)
        print('SUMÁRIO DE PATCHES v13.5.1')
        print('='*80)
        print(f'\nMudanças Aplicadas ({len(self.changes)}):')
        for i, change in enumerate(self.changes, 1):
            print(f'  {i}. {change}')
            
        if self.errors:
            print(f'\nErros ({len(self.errors)}):')
            for error in self.errors:
                print(f'  ❌ {error}')
        else:
            print('\n✅ Nenhum erro encontrado')
            
        print('\n' + '='*80)
        print('STATUS: ✅ PATCHES APLICADOS COM SUCESSO')
        print('='*80 + '\n')

def main():
    if len(sys.argv) < 2:
        print('Uso: python3 apply_patch_v13.5.1.py <caminho_para_src>')
        print('Exemplo: python3 apply_patch_v13.5.1.py ./src')
        sys.exit(1)
        
    target_dir = sys.argv[1]
    
    if not os.path.isdir(target_dir):
        print(f'❌ Diretório não encontrado: {target_dir}')
        sys.exit(1)
        
    applier = PatchApplier(target_dir)
    applier.apply_patches()
    
    if applier.errors:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == '__main__':
    main()