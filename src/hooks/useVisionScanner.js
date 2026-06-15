import { useState, useCallback } from 'react';
import { executeScan } from '../services/scannerService';

/**
 * Custom hook to manage the state of the OCR and on-device waste scanner.
 * 
 * @returns {{ scanMode: string, isScanning: boolean, selectedItemId: string, setSelectedItemId: Function, scanResult: Object|null, setScanResult: Function, actionApplied: boolean, setActionApplied: Function, handleStartScan: Function, handleApplyAlternative: Function, handleLogWasteDiverted: Function, changeScanMode: Function }} Scanner management utilities and states
 */
export const useVisionScanner = () => {
  const [scanMode, setScanMode] = useState('receipt');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('rec_1');
  const [scanResult, setScanResult] = useState(null);
  const [actionApplied, setActionApplied] = useState(false);

  const handleStartScan = useCallback((mockReceipts, mockWasteItems) => {
    setIsScanning(true);
    setScanResult(null);
    setActionApplied(false);

    const timer = setTimeout(() => {
      setIsScanning(false);
      const result = executeScan(scanMode, selectedItemId, mockReceipts, mockWasteItems);
      setScanResult(result);
    }, 1200);

    return () => clearTimeout(timer);
  }, [scanMode, selectedItemId]);

  const handleApplyAlternative = useCallback((carbonReduced, addCarbonSaved, addCredits, addXp) => {
    if (actionApplied || typeof carbonReduced !== 'number') return;
    addCarbonSaved(carbonReduced);
    addCredits(30);
    addXp(40);
    setActionApplied(true);
  }, [actionApplied]);

  const handleLogWasteDiverted = useCallback((wasteWeight, addWasteDiverted, addCredits, addXp) => {
    if (actionApplied || typeof wasteWeight !== 'number') return;
    addWasteDiverted(wasteWeight);
    addCredits(15);
    addXp(20);
    setActionApplied(true);
  }, [actionApplied]);

  const changeScanMode = useCallback((mode, defaultId) => {
    setScanMode(mode);
    setSelectedItemId(defaultId);
    setScanResult(null);
    setActionApplied(false);
  }, []);

  return {
    scanMode,
    isScanning,
    selectedItemId,
    setSelectedItemId,
    scanResult,
    setScanResult,
    actionApplied,
    setActionApplied,
    handleStartScan,
    handleApplyAlternative,
    handleLogWasteDiverted,
    changeScanMode
  };
};

export default useVisionScanner;
