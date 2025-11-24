// Mapping label dan penjelasan untuk field-field teknis agar lebih manusiawi

export const FIELD_LABELS = {
  "Age_at_diagnosis": {
    label: "Usia saat Diagnosis",
    description: "Usia pasien saat pertama kali didiagnosis. Format: X years Y days (sesuai data training)",
    placeholder: "Pilih usia"
  },
  "Primary_Diagnosis": {
    label: "Diagnosis Primer",
    description: "Jenis diagnosis primer tumor otak berdasarkan klasifikasi patologis. Diagnosis primer sangat penting untuk prediksi karena setiap jenis glioma memiliki karakteristik molekuler dan prognosis yang berbeda."
  },
  "Gender": {
    label: "Jenis Kelamin",
    description: "Jenis kelamin pasien. Beberapa jenis glioma menunjukkan perbedaan insiden berdasarkan jenis kelamin, yang dapat mempengaruhi prediksi."
  },
  "Race": {
    label: "Ras/Etnis",
    description: "Ras atau etnis pasien. Faktor demografis ini dapat mempengaruhi insiden dan karakteristik glioma pada populasi yang berbeda."
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
    description: "ATRX (Alpha Thalassemia/Mental Retardation Syndrome X-linked) adalah gen yang bermutasi pada beberapa jenis glioma, terutama pada astrositoma. Mutasi ATRX sering dikaitkan dengan status IDH1/IDH2 mutasi dan dapat mempengaruhi prognosis.",
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
  },
  "CIC": {
    label: "Status Mutasi CIC",
    description: "CIC (Capicua Transcriptional Repressor) adalah gen penekan tumor yang sering bermutasi pada oligodendroglioma. Mutasi CIC dikaitkan dengan perkembangan dan prognosis glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "MUC16": {
    label: "Status Mutasi MUC16",
    description: "MUC16 (Mucin 16, juga dikenal sebagai CA125) adalah gen yang dapat bermutasi pada berbagai jenis kanker. Mutasi MUC16 dapat mempengaruhi karakteristik tumor dan respons terhadap terapi.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "PIK3CA": {
    label: "Status Mutasi PIK3CA",
    description: "PIK3CA (Phosphatidylinositol-4,5-Bisphosphate 3-Kinase Catalytic Subunit Alpha) adalah gen yang mengkodekan subunit katalitik dari PI3K. Mutasi PIK3CA mengaktifkan jalur PI3K/AKT/mTOR yang penting untuk pertumbuhan tumor.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "NF1": {
    label: "Status Mutasi NF1",
    description: "NF1 (Neurofibromin 1) adalah gen penekan tumor yang mengatur jalur RAS. Mutasi NF1 dikaitkan dengan neurofibromatosis tipe 1 dan dapat terjadi pada glioma, mempengaruhi pertumbuhan dan perkembangan tumor.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "PIK3R1": {
    label: "Status Mutasi PIK3R1",
    description: "PIK3R1 (Phosphoinositide-3-Kinase Regulatory Subunit 1) adalah gen yang mengkodekan subunit regulator PI3K. Mutasi PIK3R1 dapat mengaktifkan jalur PI3K/AKT dan berkontribusi pada perkembangan glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "FUBP1": {
    label: "Status Mutasi FUBP1",
    description: "FUBP1 (Far Upstream Element Binding Protein 1) adalah gen penekan tumor yang sering bermutasi pada oligodendroglioma. Mutasi FUBP1 dikaitkan dengan karakteristik molekuler tertentu pada glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "RB1": {
    label: "Status Mutasi RB1",
    description: "RB1 (Retinoblastoma 1) adalah gen penekan tumor kritis yang mengatur siklus sel. Mutasi RB1 dapat menyebabkan pertumbuhan sel yang tidak terkendali dan dikaitkan dengan berbagai jenis kanker, termasuk glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "NOTCH1": {
    label: "Status Mutasi NOTCH1",
    description: "NOTCH1 (Notch Receptor 1) adalah gen yang terlibat dalam jalur pensinyalan Notch yang penting untuk perkembangan sel dan diferensiasi. Mutasi NOTCH1 dapat mempengaruhi karakteristik glioma dan respons terhadap terapi.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "BCOR": {
    label: "Status Mutasi BCOR",
    description: "BCOR (BCL6 Corepressor) adalah gen yang terlibat dalam represi transkripsi. Mutasi BCOR dapat mempengaruhi regulasi gen dan perkembangan tumor pada beberapa jenis kanker, termasuk glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "CSMD3": {
    label: "Status Mutasi CSMD3",
    description: "CSMD3 (CUB and Sushi Multiple Domains 3) adalah gen yang dapat bermutasi pada berbagai jenis kanker. Mutasi CSMD3 dapat mempengaruhi interaksi sel dan karakteristik tumor.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "SMARCA4": {
    label: "Status Mutasi SMARCA4",
    description: "SMARCA4 (SWI/SNF Related, Matrix Associated, Actin Dependent Regulator of Chromatin, Subfamily A, Member 4) adalah gen yang terlibat dalam remodeling kromatin. Mutasi SMARCA4 dapat mempengaruhi regulasi gen dan perkembangan tumor.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "GRIN2A": {
    label: "Status Mutasi GRIN2A",
    description: "GRIN2A (Glutamate Ionotropic Receptor NMDA Type Subunit 2A) adalah gen yang mengkodekan subunit reseptor NMDA. Mutasi GRIN2A dapat mempengaruhi pensinyalan saraf dan telah dikaitkan dengan beberapa jenis tumor otak.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "IDH2": {
    label: "Status Mutasi IDH2",
    description: "IDH2 (Isocitrate Dehydrogenase 2) adalah gen yang mirip dengan IDH1 dan juga sering bermutasi pada glioma. Mutasi IDH2, seperti IDH1, biasanya dikaitkan dengan prognosis yang lebih baik pada pasien glioma.",
    options: {
      "0": "Tidak Bermutasi",
      "1": "Bermutasi"
    }
  },
  "FAT4": {
    label: "Status Mutasi FAT4",
    description: "FAT4 (FAT Atypical Cadherin 4) adalah gen yang mengkodekan protein cadherin atipikal yang terlibat dalam adhesi sel dan pensinyalan. Mutasi FAT4 dapat mempengaruhi interaksi sel-sel dan perkembangan tumor, termasuk glioma. Gen ini berperan dalam regulasi pertumbuhan sel dan diferensiasi.",
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

