'use client';

import React, { useState } from 'react';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creatorName: string;
  creatorId: string;
}

export function TipModal({ isOpen, onClose, creatorName }: TipModalProps) {
  const [amount, setAmount] = useState('5.00');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white text-sm"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center mb-1">Send a Tip</h3>
        <p className="text-xs text-slate-400 text-center mb-6">Support {creatorName}</p>

        {success ? (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm font-semibold text-pink-500">Tip Sent Successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSendTip} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Tip Amount ($)
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {['5', '10', '25'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`py-2 text-xs font-semibold rounded-lg border ${
                      amount === val
                        ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 rounded-lg transition-colors text-sm shadow-lg shadow-pink-600/20"
            >
              Send ${amount} Tip
            </button>
          </form>
        )}
      </div>
    </div>
  );
}