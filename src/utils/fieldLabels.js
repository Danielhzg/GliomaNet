// Mapping label dan penjelasan untuk field-field teknis agar lebih manusiawi

export const FIELD_LABELS = {
  "Age_at_diagnosis": {
    label: "Usia saat Diagnosis",
    description: "Usia pasien saat pertama kali didiagnosis. Format: X years Y days (sesuai data training)",
    placeholder: "Pilih usia"
  },
  "Primary_Diagnosis": {
    label: "Diagnosis Primer",
    description: "Jenis diagnosis primer tumor otak berdasarkan klasifikasi patologis"
  },
  "Gender": {
    label: "Jenis Kelamin",
    description: "Jenis kelamin pasien"
  },
  "Race": {
    label: "Ras/Etnis",
    description: "Ras atau etnis pasien"
  },
  "IDH1": {
    label: "Status Mutasi IDH1",
    description: "IDH1 (Isocitrate Dehydrogenase 1) adalah gen yang sering bermutasi pada glioma. Mutasi IDH1 biasanya dikaitkan dengan prognosis yang lebih baik.",
    options: {
      "0": "Tidak Bermutasi (Wildtype)",
      "1": "Bermutasi (Mutated)",
      "Wildtype": "Tidak Bermutasi (Wildtype)",
      "Mutated": "Bermutasi (Mutated)"
    }
  },
  "ATRX": {
    label: "Status Mutasi ATRX",
    description: "ATRX (Alpha Thalassemia/Mental Retardation Syndrome X-linked) adalah gen yang bermutasi pada beberapa jenis glioma, terutama pada astrositoma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "TP53": {
    label: "Status Mutasi TP53",
    description: "TP53 (Tumor Protein p53) adalah gen penekan tumor yang sering bermutasi pada berbagai jenis kanker, termasuk glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "EGFR": {
    label: "Status Mutasi EGFR",
    description: "EGFR (Epidermal Growth Factor Receptor) adalah gen yang sering mengalami amplifikasi atau mutasi pada glioblastoma (GBM).",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "PTEN": {
    label: "Status Mutasi PTEN",
    description: "PTEN (Phosphatase and Tensin Homolog) adalah gen penekan tumor yang sering hilang atau bermutasi pada glioblastoma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "PDGFRA": {
    label: "Status Mutasi PDGFRA",
    description: "PDGFRA (Platelet-Derived Growth Factor Receptor Alpha) adalah gen yang dapat mengalami amplifikasi atau mutasi pada beberapa jenis glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  }
};

// Helper function untuk mendapatkan label yang lebih manusiawi
export function getHumanLabel(fieldName) {
  return FIELD_LABELS[fieldName]?.label || fieldName.replace(/_/g, ' ');
}

// Helper function untuk mendapatkan deskripsi
export function getFieldDescription(fieldName) {
  return FIELD_LABELS[fieldName]?.description || "";
}

// Helper function untuk mendapatkan opsi yang lebih manusiawi
export function getHumanOptions(fieldName, originalOptions) {
  const fieldConfig = FIELD_LABELS[fieldName];
  if (!fieldConfig?.options) {
    return originalOptions;
  }
  
  // Map original options ke human-readable options
  return originalOptions.map(opt => {
    return fieldConfig.options[opt] || opt;
  });
}

// Helper function untuk convert human-readable value kembali ke original value
export function convertToOriginalValue(fieldName, humanValue) {
  const fieldConfig = FIELD_LABELS[fieldName];
  if (!fieldConfig?.options) {
    return humanValue;
  }
  
  // Find original value from human-readable value
  for (const [original, human] of Object.entries(fieldConfig.options)) {
    if (human === humanValue) {
      return original;
    }
  }
  
  return humanValue;
}

