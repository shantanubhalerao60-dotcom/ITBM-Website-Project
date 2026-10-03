import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Trash2, RefreshCw, X, ShoppingBag } from 'lucide-react';

export const CartToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-70 flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-emerald-500';
        let borderColor = 'border-emerald-200';
        let bgGlow = 'bg-white';

        if (toast.type === 'remove') {
          Icon = Trash2;
          iconColor = 'text-rose-500';
          borderColor = 'border-rose-200';
        } else if (toast.type === 'update') {
          Icon = RefreshCw;
          iconColor = 'text-cyan-500';
          borderColor = 'border-cyan-200';
        } else if (toast.type === 'clear') {
          Icon = ShoppingBag;
          iconColor = 'text-slate-500';
          borderColor = 'border-slate-200';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-3.5 rounded-2xl shadow-xl border ${borderColor} ${bgGlow} text-slate-800 animate-in slide-in-from-bottom-3 duration-200 backdrop-blur-md`}
          >
            <div className="mt-0.5 shrink-0">
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0 text-xs">
              <div className="font-bold text-slate-900 leading-tight">
                {toast.message}
              </div>
              {toast.productName && (
                <div className="text-[11px] text-slate-500 truncate mt-0.5">
                  {toast.productName}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition-colors shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
