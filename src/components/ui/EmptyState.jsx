import React from 'react';

export default function EmptyState({ 
  icon: Icon, 
  title = "No Data Found", 
  message = "There is nothing here yet.",
  actionButton = null 
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm my-4 transition-all duration-300 hover:border-brand-300 hover:shadow-md group">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 group-hover:bg-brand-50 transition-colors duration-300">
        {Icon ? (
          <Icon className="text-4xl text-slate-300 group-hover:text-brand-500 transition-colors duration-300" />
        ) : (
          <svg className="w-10 h-10 text-slate-300 group-hover:text-brand-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 text-center max-w-sm mb-6 leading-relaxed">
        {message}
      </p>
      {actionButton && (
        <div className="mt-2">
          {actionButton}
        </div>
      )}
    </div>
  );
}
