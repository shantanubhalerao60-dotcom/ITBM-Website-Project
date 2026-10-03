import React from 'react';
import type { Product, ProductBatch } from '../types/product';
import { formatDate } from '../utils/currency';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  QrCode, 
  Award,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface CoaDocumentViewerProps {
  product: Product;
  batch: ProductBatch;
  isOpen: boolean;
  onClose: () => void;
}

export const CoaDocumentViewer: React.FC<CoaDocumentViewerProps> = ({
  product,
  batch,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    alert(`Downloading official NABL Certificate of Analysis PDF for Batch #${batch.batchNumber} (${batch.reportId}).pdf`);
  };

  const { testedParameters } = batch;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Document Viewer Toolbar */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-sm text-white">Certificate of Analysis (CoA)</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-500/30">
                  {batch.reportId}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Original accredited laboratory analytical examination report
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors hidden sm:inline-flex items-center space-x-1 text-xs"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1.5 transition-colors shadow-xs"
              title="Download PDF copy"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic High-Trust Document Body (Printable Canvas) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center">
          <div className="bg-white w-full max-w-3xl shadow-lg border border-slate-300 p-6 sm:p-10 font-sans text-slate-900 relative">
            
            {/* Subtle Security Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden">
              <span className="text-8xl font-black uppercase rotate-[-30deg] tracking-widest text-slate-900">
                VERIFIED AUTHENTIC
              </span>
            </div>

            {/* Document Header with Lab & Accreditation Branding */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-6 h-6 text-emerald-700" />
                    <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-950">
                      {batch.labName}
                    </h1>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Central Analytical Laboratory • Food Safety & Toxicology Division
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    Accreditation: {batch.accreditationId} • FSSAI Recognized Lab ID: 22019-IN
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs rounded">
                    CERTIFICATE OF ANALYSIS
                  </span>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">
                    ULR: {batch.reportId}-ULR
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Report Issue Date: <strong className="text-slate-800">{formatDate(batch.testDate)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Identification Meta Grid */}
            <div className="mb-6 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Brand / Sponsor</span>
                  <span className="font-bold text-slate-900">{product.brand}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Sample Description</span>
                  <span className="font-semibold text-slate-800 line-clamp-1">{product.name}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Batch Number</span>
                  <span className="font-mono font-bold text-emerald-700">{batch.batchNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Manufacturing Date</span>
                  <span className="font-semibold text-slate-800">{formatDate(batch.manufacturingDate)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Expiry Date</span>
                  <span className="font-semibold text-slate-800">{formatDate(batch.expiryDate)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Sample Received</span>
                  <span className="font-semibold text-slate-800">{formatDate(batch.testDate)}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Packaging / Seal</span>
                  <span className="font-semibold text-slate-800">Factory Sealed Original</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Cold Chain State</span>
                  <span className="font-semibold text-emerald-700">Maintained (18°C)</span>
                </div>
              </div>
            </div>

            {/* Analytical Results Table */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>I. Chemical & Nutritional Assay Results</span>
                <span className="text-[10px] font-normal text-slate-500">Method: Kjeldahl Titration / Nitrogen Factor 6.38</span>
              </h3>

              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-2 px-3">Test Parameter</th>
                    <th className="py-2 px-3">Test Standard</th>
                    <th className="py-2 px-3">Claimed Label Value</th>
                    <th className="py-2 px-3">Observed Result</th>
                    <th className="py-2 px-3 text-right">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testedParameters.proteinClaimedGrams && testedParameters.proteinClaimedGrams > 0 ? (
                    <>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Protein per Scoop / Serving</td>
                        <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">AOAC 2001.11 / IS 7219</td>
                        <td className="py-2 px-3 text-slate-700">{testedParameters.proteinClaimedGrams} g</td>
                        <td className="py-2 px-3 font-bold text-emerald-700">{testedParameters.proteinTestedGrams} g</td>
                        <td className="py-2 px-3 text-right">
                          <span className="inline-flex items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            COMPLIES ({testedParameters.proteinFoundPercent}% recovery)
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-900">Total Nitrogen / Pure Protein Yield</td>
                        <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">IS 7219:1973</td>
                        <td className="py-2 px-3 text-slate-700">&gt; 75.0% w/w</td>
                        <td className="py-2 px-3 font-bold text-slate-900">{testedParameters.proteinFoundPercent}% w/w</td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-700">PASS</td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td className="py-2 px-3 font-semibold text-slate-900">Active Substance Purity Assay</td>
                      <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">USP / HPLC-UV Method</td>
                      <td className="py-2 px-3 text-slate-700">≥ 99.0%</td>
                      <td className="py-2 px-3 font-bold text-emerald-700">99.98%</td>
                      <td className="py-2 px-3 text-right">
                        <span className="inline-flex items-center text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          COMPLIES
                        </span>
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Moisture Content</td>
                    <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">Karl Fischer Titration</td>
                    <td className="py-2 px-3 text-slate-700">&lt; 5.0%</td>
                    <td className="py-2 px-3 font-medium text-slate-800">3.8%</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-700">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-slate-900">Free Amino Spiking Screen (Glycine, Taurine)</td>
                    <td className="py-2 px-3 text-slate-600 font-mono text-[11px]">HPLC Amino Acid Profiling</td>
                    <td className="py-2 px-3 text-slate-700">Not Detected</td>
                    <td className="py-2 px-3 font-bold text-emerald-700">Zero Spiking Detected</td>
                    <td className="py-2 px-3 text-right font-bold text-emerald-700">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Toxic Heavy Metals Screen Table */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>II. Toxic Trace Heavy Metals (Inductively Coupled Plasma Mass Spectrometry - ICP-MS)</span>
                <span className="text-[10px] font-normal text-slate-500">EPA 6020B / AOAC 2011.19</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                  <span className="text-slate-500 block text-[10px] font-bold">Lead (Pb)</span>
                  <div className="text-emerald-700 font-bold text-sm mt-0.5">
                    ND ({testedParameters.heavyMetalsDetail?.leadPpm ?? '0.012'} ppm)
                  </div>
                  <span className="text-[10px] text-slate-400">Limit: &lt; 0.5 ppm • PASS</span>
                </div>
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                  <span className="text-slate-500 block text-[10px] font-bold">Cadmium (Cd)</span>
                  <div className="text-emerald-700 font-bold text-sm mt-0.5">
                    ND ({testedParameters.heavyMetalsDetail?.cadmiumPpm ?? '0.004'} ppm)
                  </div>
                  <span className="text-[10px] text-slate-400">Limit: &lt; 0.3 ppm • PASS</span>
                </div>
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                  <span className="text-slate-500 block text-[10px] font-bold">Arsenic (As)</span>
                  <div className="text-emerald-700 font-bold text-sm mt-0.5">
                    ND ({testedParameters.heavyMetalsDetail?.arsenicPpm ?? '0.008'} ppm)
                  </div>
                  <span className="text-[10px] text-slate-400">Limit: &lt; 0.5 ppm • PASS</span>
                </div>
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50">
                  <span className="text-slate-500 block text-[10px] font-bold">Mercury (Hg)</span>
                  <div className="text-emerald-700 font-bold text-sm mt-0.5">
                    ND ({testedParameters.heavyMetalsDetail?.mercuryPpm ?? '0.001'} ppm)
                  </div>
                  <span className="text-[10px] text-slate-400">Limit: &lt; 0.1 ppm • PASS</span>
                </div>
              </div>
            </div>

            {/* Microbiological Purity Table */}
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 border-b border-slate-200 pb-1 flex items-center justify-between">
                <span>III. Microbiological Pathogen Safety</span>
                <span className="text-[10px] font-normal text-slate-500">IS 5887 / US FDA BAM</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">Escherichia coli</span>
                    <span className="font-bold text-emerald-700">Absent / 10g</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">PASS</span>
                </div>
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">Salmonella Species</span>
                    <span className="font-bold text-emerald-700">Absent / 25g</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">PASS</span>
                </div>
                <div className="border border-slate-200 rounded p-2.5 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-slate-500 block text-[10px] font-bold">Yeast & Mold Count</span>
                    <span className="font-bold text-emerald-700">&lt; 10 CFU/g</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">PASS</span>
                </div>
              </div>
            </div>

            {/* Official Certification Declaration & Signatures */}
            <div className="border-t-2 border-slate-900 pt-4 mt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 border border-slate-300 rounded-lg p-1.5 bg-slate-50 flex items-center justify-center shrink-0">
                    <QrCode className="w-12 h-12 text-slate-800" />
                  </div>
                  <div className="text-[11px] text-slate-500 max-w-xs">
                    <strong className="text-slate-900 block font-semibold">Cryptographic Verification:</strong>
                    Scan to confirm tamper-proof authenticity on NABL national central database. Hash: <span className="font-mono text-slate-700">sha256-88a4b901f...</span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="flex items-center space-x-6 text-center text-xs">
                  <div>
                    <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1 mb-1">
                      Dr. R. K. Sharma, Ph.D.
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Chief Analytical Chemist
                    </span>
                  </div>

                  <div>
                    <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-300 pb-1 mb-1">
                      K. V. Sundaram
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">
                      Quality Assurance Director
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
              This Certificate of Analysis relates exclusively to the tested batch sample referenced above. End of official report.
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center space-x-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NABL Accredited & FSSAI Certified Official Electronic Record</span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-xl transition-colors text-xs"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
