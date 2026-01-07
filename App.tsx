
import React, { useState } from 'react';
import { VoucherForm } from './components/VoucherForm.tsx';
import { VoucherPreview } from './components/VoucherPreview.tsx';
import { VoucherData, Passenger } from './types';
import { Printer, Edit3, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const INITIAL_DATA: VoucherData = {
  tourName: "Chardham 5N/6D Heli Tour",
  bookingId: "TV-CH-2025-01",
  flyingDate: "2025-10-03",
  arrivalDate: "2025-10-02",
  baseLocation: "Sahastradhara Helidrome, Dehradun",
  sector: "Dehradun–Yamunotri-Gangotri-Kedarnath-Badrinath–Dehradun",
  passengers: [
    { id: '1', name: 'Madhu Sachdeva', age: '63', weight: '57', gender: 'F', idNumber: '643515188' },
    { id: '2', name: 'Vikram Sachdeva', age: '70', weight: '70', gender: 'M', idNumber: '650921972' }
  ],
  amountPaid: "Full Amount Received",
  bookedBy: "Travel Vaidya Official",
  guestAddress: "123, Luxury Heights, New Delhi",
  guestContact: "+91 9876543210",
  emergencyContact: "+91 9999988888",
  guestEmail: "guest@example.com",
  addOnServices: "Wheelchair assistance at Kedarnath",
  crewContacts: [
    {
      location: "Dehradun Base",
      contacts: [
        { name: "Mr. Pradeep Choudhary", role: "Manager – Chardham Charters", phone: "+91 9001986666" },
        { name: "Mr. Anurag", role: "Asst. Manager – Chardham Charters", phone: "+91 8168354041" }
      ]
    },
    {
      location: "Dehradun Head Office",
      contacts: [
        { name: "Mr. Naman Agarwal", role: "Manager – Sales & Operations", phone: "+91 7292002437" }
      ]
    }
  ]
};

const App: React.FC = () => {
  const [data, setData] = useState<VoucherData>(INITIAL_DATA);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleAIImprove = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Provide a concise list of 3-4 professional travel reminders for a helicopter tour booking. Current tour: ${data.tourName}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      if (response.text) {
        // Since summary is removed, we could potentially use this to improve T&C or Add-ons
        // For now, let's just log or ignore if no field exists.
        console.log("AI Suggestion:", response.text);
      }
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="no-print sticky top-0 bg-white border-b border-slate-200 z-50 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">Travel Vaidya <span className="text-indigo-600">Voucher Gen</span></h1>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              {view === 'edit' ? <Printer className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {view === 'edit' ? 'Preview & Print' : 'Back to Edit'}
            </button>
            
            {view === 'preview' && (
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print Now
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {view === 'edit' ? (
          <VoucherForm data={data} onChange={setData} />
        ) : (
          <div className="flex flex-col gap-8">
             <VoucherPreview data={data} />
          </div>
        )}
      </main>

      <div className="print-only fixed bottom-0 left-0 w-full text-center text-[10px] text-gray-400 py-2 border-t border-gray-100 bg-white">
        Travel Vaidya - Your Wellness & Travel Partner | travelvaidya.com
      </div>
    </div>
  );
};

export default App;
