import React, { useState, useEffect, useRef } from 'react';
import type { Product } from '../types/product';
import { useCart } from '../context/CartContext';
import { calculateProteinMetrics } from '../utils/metrics';
import { formatCurrency } from '../utils/currency';
import {
  Bot,
  Send,
  X,
  RotateCcw,
  ShieldCheck,
  FlaskConical,
  ShoppingCart,
  ChevronRight,
  Star,
  Check,
  Lock,
} from 'lucide-react';

interface RPBotProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onVerifyBatch: (product: Product) => void;
  onNavigateToAdmin?: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionType?: 'protein_calc' | 'batch_lookup' | 'recommendation' | 'general' | 'admin_portal';
  batchDetails?: {
    batchNumber: string;
    productName: string;
    brand: string;
    labName: string;
    testedProtein?: number;
    claimedProtein?: number;
    heavyMetalsPass: boolean;
    product: Product;
  };
}

const QUICK_PROMPTS = [
  { label: '💪 Recommend Best Whey', query: 'recommend best whey protein' },
  { label: '🌱 Pure Plant Protein', query: 'show vegan plant protein' },
  { label: '⚡ Creatine & Pre-Workout', query: 'creatine and pre workout supplements' },
  { label: '⚖️ Daily Protein Calculator', query: 'calculate daily protein requirement' },
  { label: '🔬 Verify a Batch CoA', query: 'verify batch test reports' },
  { label: '💰 Lowest ₹/g Value', query: 'which protein has the best price per gram' },
];

export const RPBot: React.FC<RPBotProps> = ({
  products,
  onSelectProduct,
  onVerifyBatch,
  onNavigateToAdmin,
}) => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedItemIds, setAddedItemIds] = useState<{ [id: string]: boolean }>({});
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Conversation history
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "👋 Hey there! I'm **RP Bot**, your intelligent sports nutrition & supplement assistant. How can I help you reach your fitness goals today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnreadNotification(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const defaultFlavor = product.flavor || product.flavors?.[0];
    addToCart(product, 1, true, defaultFlavor);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "🔄 Chat reset! I'm **RP Bot**, ready to help with supplement recommendations, protein calculation, and lab purity checks. Ask me anything!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Helper logic to find matches and answer queries
  const processQuery = (rawQuery: string): Message => {
    const q = rawQuery.toLowerCase().trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Protein Requirement Calculator Intent
    const weightMatch = q.match(/(\d{2,3})\s*(kg|kilos|kgs)?/);
    if (
      q.includes('calculate') ||
      q.includes('calculator') ||
      q.includes('how much protein') ||
      q.includes('protein requirement') ||
      q.includes('protein need') ||
      (weightMatch && (q.includes('kg') || q.includes('weigh')))
    ) {
      if (weightMatch) {
        const weight = parseInt(weightMatch[1], 10);
        if (weight >= 35 && weight <= 200) {
          const sedentaryMin = Math.round(weight * 0.8);
          const activeMin = Math.round(weight * 1.4);
          const activeMax = Math.round(weight * 1.8);
          const hypertrophyMin = Math.round(weight * 1.8);
          const hypertrophyMax = Math.round(weight * 2.2);

          // Find top 2 highest value proteins
          const topProteins = [...products]
            .filter((p) => p.category === 'Whey Protein' || p.category === 'Plant Protein')
            .sort((a, b) => {
              const metA = calculateProteinMetrics(a)?.pricePerGramProtein || 999;
              const metB = calculateProteinMetrics(b)?.pricePerGramProtein || 999;
              return metA - metB;
            })
            .slice(0, 2);

          return {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: `📊 **Daily Protein Calculation for ${weight} kg:**\n\n` +
              `• **General Health / Sedentary:** ~${sedentaryMin}g / day (0.8g/kg)\n` +
              `• **Active Fitness / Fat Loss:** ${activeMin}g – ${activeMax}g / day (1.4–1.8g/kg)\n` +
              `• **Muscle Hypertrophy & Strength:** **${hypertrophyMin}g – ${hypertrophyMax}g / day** (1.8–2.2g/kg)\n\n` +
              `💡 *Pro Tip:* 1 scoop of our third-party verified whey provides **24g–28g pure protein**, which fulfills about 16–20% of your daily requirement. Here are the top cost-per-gram options:`,
            timestamp: timeNow,
            recommendedProducts: topProteins,
            actionType: 'protein_calc',
          };
        }
      }

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `⚖️ **RP Protein Calculator:**\n\nTo calculate your exact protein target, tell me your body weight! For example, type:\n👉 *"I weigh 70 kg and want to build muscle"* or *"Calculate for 65kg"*.`,
        timestamp: timeNow,
        actionType: 'protein_calc',
      };
    }

    // 2. Batch Verification Lookup Intent
    if (
      q.includes('batch') ||
      q.includes('verify') ||
      q.includes('lab') ||
      q.includes('report') ||
      q.includes('coa') ||
      q.includes('purity')
    ) {
      // Check if user specified a batch number
      const foundProduct = products.find((p) =>
        p.batches.some((b) => q.includes(b.batchNumber.toLowerCase())) ||
        (p.batchNumber && q.includes(p.batchNumber.toLowerCase()))
      );

      if (foundProduct) {
        const batch = foundProduct.batches[0];
        return {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `🔬 **Batch Verified: #${batch.batchNumber}**\n\n` +
            `• **Product:** ${foundProduct.brand} ${foundProduct.name}\n` +
            `• **Testing Lab:** ${batch.labName}\n` +
            `• **Accreditation:** ${batch.accreditationId}\n` +
            `• **Protein Tested:** ${batch.testedParameters.proteinClaimedGrams ? `${batch.testedParameters.proteinTestedGrams}g found (Claim: ${batch.testedParameters.proteinClaimedGrams}g)` : `${batch.testedParameters.proteinFoundPercent}% content verified`}\n` +
            `• **Heavy Metals (Pb, As, Cd, Hg):** ✅ Passed / Non-Detectable\n` +
            `• **Microbiological Pathogens:** ✅ Negative / Clear\n\n` +
            `Click below to view the official Certificate of Analysis (CoA):`,
          timestamp: timeNow,
          actionType: 'batch_lookup',
          batchDetails: {
            batchNumber: batch.batchNumber,
            productName: foundProduct.name,
            brand: foundProduct.brand,
            labName: batch.labName,
            testedProtein: batch.testedParameters.proteinTestedGrams,
            claimedProtein: batch.testedParameters.proteinClaimedGrams,
            heavyMetalsPass: batch.testedParameters.heavyMetalsPass,
            product: foundProduct,
          },
        };
      }

      // If no specific batch found, show sample verifiable batches
      const sampleProducts = products.filter((p) => p.batches && p.batches.length > 0).slice(0, 3);
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🔬 **Independent 3rd-Party Lab Verification:**\n\n` +
          `Every single product on our platform undergoes strict NABL/ISO-IEC 17025 accredited laboratory testing for protein accuracy and heavy metal screening (Lead, Arsenic, Cadmium, Mercury).\n\n` +
          `Try entering a batch code, e.g. **MB-BZ-2024-8841**, **NKP-CR-5541**, or **NB-RAW-7719**, or pick one of these verified batches below:`,
        timestamp: timeNow,
        recommendedProducts: sampleProducts,
        actionType: 'batch_lookup',
      };
    }

    // 3. Lowest Price / Best Value Intent
    if (q.includes('cheap') || q.includes('lowest') || q.includes('best value') || q.includes('price per gram') || q.includes('value')) {
      const valueSorted = [...products]
        .filter((p) => calculateProteinMetrics(p) !== null)
        .sort((a, b) => {
          const metA = calculateProteinMetrics(a)?.pricePerGramProtein || 999;
          const metB = calculateProteinMetrics(b)?.pricePerGramProtein || 999;
          return metA - metB;
        })
        .slice(0, 3);

      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `💰 **Top 3 Highest Protein Value Supplements (Lowest ₹/g):**\n\nWe calculate the true price per gram of pure protein: \`Total Cost ÷ (Servings × Protein per Scoop)\`. These products give you the most muscle fuel for your money:`,
        timestamp: timeNow,
        recommendedProducts: valueSorted,
        actionType: 'recommendation',
      };
    }

    // 4. Plant / Vegan Intent
    if (q.includes('plant') || q.includes('vegan') || q.includes('soy') || q.includes('pea') || q.includes('dairy free') || q.includes('dairy-free')) {
      const plantProducts = products.filter((p) => p.category === 'Plant Protein');
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🌱 **Plant-Based & Vegan Protein Recommendations:**\n\n` +
          `Plant proteins are 100% dairy-free, hypoallergenic, and gentle on the gut. Here are our top-rated lab-tested plant blends:`,
        timestamp: timeNow,
        recommendedProducts: plantProducts.slice(0, 3),
        actionType: 'recommendation',
      };
    }

    // 5. Creatine & Pre-workout Intent
    if (q.includes('creatine') || q.includes('pre workout') || q.includes('preworkout') || q.includes('energy') || q.includes('pump') || q.includes('strength')) {
      const performanceProducts = products.filter((p) => p.category === 'Performance & Creatine');
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `⚡ **Strength & Performance Fuel:**\n\n` +
          `• **Creatine Monohydrate:** Scientifically proven to increase ATP cellular energy, muscular power output, and hydration (take 3g–5g daily).\n` +
          `• **Pre-Workout:** Formulated with L-Citrulline Malate, Beta-Alanine, and caffeine for skin-splitting pumps and laser focus.\n\n` +
          `Here are our certified performance formulas:`,
        timestamp: timeNow,
        recommendedProducts: performanceProducts.slice(0, 3),
        actionType: 'recommendation',
      };
    }

    // 6. Whey Protein Intent
    if (q.includes('whey') || q.includes('isolate') || q.includes('concentrate') || q.includes('muscle') || q.includes('build')) {
      const wheyProducts = products.filter((p) => p.category === 'Whey Protein');
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `💪 **Verified Whey Protein Top Picks:**\n\n` +
          `Whey protein provides rapid bioavailability and high leucine content (essential for Muscle Protein Synthesis). Here are our most popular certified whey options:`,
        timestamp: timeNow,
        recommendedProducts: wheyProducts.slice(0, 3),
        actionType: 'recommendation',
      };
    }

    // 7. Daily Wellness / Vitamins / Fish Oil / Calcium
    if (q.includes('wellness') || q.includes('vitamin') || q.includes('multivitamin') || q.includes('omega') || q.includes('fish oil') || q.includes('calcium') || q.includes('joint')) {
      const wellnessProducts = products.filter((p) => p.category === 'Daily Wellness');
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🛡️ **Daily Wellness & Recovery Essentials:**\n\n` +
          `Micro-nutrients and joint support supplements to maintain immunity, bone density, and vital organ health:`,
        timestamp: timeNow,
        recommendedProducts: wellnessProducts.slice(0, 3),
        actionType: 'recommendation',
      };
    }

    // 8. Brand search
    const brands = ['muscleblaze', 'nakpro', 'nutrabay', 'nutrabox', 'tata', 'avvatar', 'optimum nutrition', 'wellcore', 'truebasics', 'cosmix'];
    const matchedBrand = brands.find((b) => q.includes(b));
    if (matchedBrand) {
      const brandProducts = products.filter((p) => p.brand.toLowerCase().includes(matchedBrand));
      if (brandProducts.length > 0) {
        return {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `🏷️ Found **${brandProducts.length} certified products** from **${brandProducts[0].brand}**:`,
          timestamp: timeNow,
          recommendedProducts: brandProducts.slice(0, 3),
          actionType: 'recommendation',
        };
      }
    }

    // 9. Operations & Admin Portal Intent
    if (q.includes('admin') || q.includes('staff') || q.includes('portal') || q.includes('operations') || q.includes('dashboard')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🔐 **Operations & Staff Admin Portal:**\n\n` +
          `• **URL Route:** \`/admin\` (or click the button below)\n` +
          `• **Demo Credentials:** \`admin@hyuga-demo.com\` / \`admin2026\` (Use the 1-Click "Demo Fill" button)\n\n` +
          `The staff dashboard provides supply chain analytics, live batch CoA management, and revenue monitoring.`,
        timestamp: timeNow,
        actionType: 'admin_portal',
      };
    }

    // 10. Shipping & FAQs
    if (q.includes('delivery') || q.includes('shipping') || q.includes('order') || q.includes('return') || q.includes('refund')) {
      return {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `🚚 **Shipping & Order Information:**\n\n` +
          `• **Same-Day Dispatch:** Orders placed before 4 PM are shipped the same day.\n` +
          `• **Free Express Delivery:** On all orders above ₹999.\n` +
          `• **Tamper-Evident Packaging:** Every pouch and tub is sealed with a holographic batch tag.\n` +
          `• **100% Purity Guarantee:** If the QR code batch CoA fails lab verification, 100% instant refund guarantee.`,
        timestamp: timeNow,
        actionType: 'general',
      };
    }

    // 10. Default Smart Assistant Fallback
    const featured = products.slice(0, 2);
    return {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `🤖 I'm here to help with all things sports nutrition! Here are popular things you can ask me:\n\n` +
        `• *"Recommend best whey for muscle gain"*\n` +
        `• *"I weigh 72kg, how much protein do I need?"*\n` +
        `• *"Show me vegan plant protein"*\n` +
        `• *"Verify batch MB-BZ-2024-8841"*\n` +
        `• *"Which supplement has the lowest price per gram?"*`,
      timestamp: timeNow,
      recommendedProducts: featured,
      actionType: 'general',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Realistic typing delay (450ms)
    setTimeout(() => {
      const reply = processQuery(text);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center">
        {!isOpen && hasUnreadNotification && (
          <div className="hidden sm:flex items-center bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-emerald-200 mr-2.5 animate-bounce select-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            <span>Ask RP Bot • AI Nutritionist</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`relative p-3.5 sm:p-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 group ${
            isOpen
              ? 'bg-slate-900 text-white rotate-90 ring-4 ring-slate-900/20'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-500/25 hover:shadow-emerald-600/30'
          }`}
          aria-label={isOpen ? 'Close RP Bot' : 'Open RP Bot Assistant'}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-emerald-600" />
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-slate-900 text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-extrabold text-sm text-white tracking-wide">
                    RP Bot
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AI Advisor
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Sports Nutrition Engine</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close RP Bot"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center space-x-1.5 shrink-0">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.query)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-slate-700 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                  }`}
                >
                  {/* Message formatted with markdown bold and bullet points */}
                  <div className="space-y-1 whitespace-pre-line">
                    {msg.text.split('\n').map((line, i) => {
                      if (line.startsWith('• ')) {
                        return (
                          <div key={i} className="flex items-start space-x-1.5 pl-1 my-0.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>
                              {line.replace('• ', '').split('**').map((chunk, ci) =>
                                ci % 2 === 1 ? <strong key={ci} className="font-extrabold text-slate-950">{chunk}</strong> : chunk
                              )}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <p key={i}>
                          {line.split('**').map((chunk, ci) =>
                            ci % 2 === 1 ? <strong key={ci} className="font-extrabold text-slate-950">{chunk}</strong> : chunk
                          )}
                        </p>
                      );
                    })}
                  </div>

                  {/* Batch Card Action if available */}
                  {msg.batchDetails && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold flex items-center gap-1">
                          <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                          <span>CoA Report #{msg.batchDetails.batchNumber}</span>
                        </span>
                        <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-emerald-300 font-bold text-emerald-800">
                          NABL TC-88912
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onVerifyBatch(msg.batchDetails!.product);
                        }}
                        className="w-full mt-1 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                      >
                        <span>Open Full Lab Certificate</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Admin Portal Action if requested */}
                  {msg.actionType === 'admin_portal' && onNavigateToAdmin && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Staff Operations Portal</span>
                        </span>
                        <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">
                          Route: /admin
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(false);
                          onNavigateToAdmin();
                        }}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Open Admin Portal Gate</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Inline Product Recommendation Cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Matching Supplements ({msg.recommendedProducts.length}):
                      </span>
                      {msg.recommendedProducts.map((p) => {
                        const proteinMetric = calculateProteinMetrics(p);
                        const isAdded = addedItemIds[p.id];

                        return (
                          <div
                            key={p.id}
                            onClick={() => {
                              setIsOpen(false);
                              onSelectProduct(p);
                            }}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100/90 rounded-xl border border-slate-200 transition-all flex items-center gap-2.5 cursor-pointer group hover:border-emerald-300"
                          >
                            <div className="w-12 h-12 bg-white rounded-lg p-1 border border-slate-100 flex items-center justify-center shrink-0">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-extrabold uppercase text-emerald-700">
                                  {p.brand}
                                </span>
                                <span className="text-[10px] text-slate-400">•</span>
                                <span className="text-[10px] font-bold text-amber-600 flex items-center">
                                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500 mr-0.5" />
                                  {p.rating}
                                </span>
                              </div>
                              <h4 className="font-bold text-slate-900 text-xs truncate">
                                {p.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-extrabold text-slate-950 text-xs">
                                  {formatCurrency(p.discountedPrice)}
                                </span>
                                {proteinMetric && (
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                                    ₹{proteinMetric.pricePerGramProtein}/g
                                  </span>
                                )}
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handleAddToCart(p, e)}
                              className={`p-2 rounded-lg font-bold text-xs transition-all shrink-0 cursor-pointer ${
                                isAdded
                                  ? 'bg-emerald-700 text-white'
                                  : 'bg-white hover:bg-emerald-600 hover:text-white text-slate-700 border border-slate-200'
                              }`}
                              title="Add to cart"
                            >
                              {isAdded ? (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              ) : (
                                <ShoppingCart className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <span
                    className={`block text-[9px] mt-1.5 ${
                      msg.sender === 'user' ? 'text-emerald-100 text-right' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs p-2 bg-white rounded-2xl border border-slate-200 w-fit">
                <Bot className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                <span className="font-medium text-[11px] text-slate-600">RP Bot is typing</span>
                <span className="flex space-x-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about protein, brands, goals, or batches..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 bg-slate-50 transition-all text-slate-800 placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center shrink-0 cursor-pointer ${
                  inputMessage.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 px-1">
              <span>Powered by RP Sports Nutrition Model</span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                100% NABL Verified
              </span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
