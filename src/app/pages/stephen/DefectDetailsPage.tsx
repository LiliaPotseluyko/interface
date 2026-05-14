import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { ArrowLeft, Share2, ChevronDown, ChevronUp, Edit2, Check, ChevronLeft, ChevronRight, MapPin, Navigation as NavIcon, History, Calendar as CalendarIcon, Lightbulb, FileText, Eye, User, AlertCircle, TrendingUp, Clock, Map, Camera, Glasses } from 'lucide-react';

export default function DefectDetailsPage() {
  const navigate = useNavigate();
  const { personaId, defectId } = useParams<{ personaId: string; defectId: string }>();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['id']);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [confirmedSections, setConfirmedSections] = useState<string[]>(['location']);
  const [reviewedFields, setReviewedFields] = useState<string[]>([]);
  const [isDefectConfirmed, setIsDefectConfirmed] = useState(false);
  const [selectedDefectType, setSelectedDefectType] = useState<string>('');

  // Mock defect data
  const defect = {
    id: 'DEF-1251',
    type: 'Surface Cracking',
    confidence: 62,
    priority: 'medium',
    location: 'A14',
    section: 'CS-E',
    position: 'Near Cambridge Services',
    gps: '52.2053° N, 0.1218° E',
    chainage: 'CH 23+450',
    roadType: 'A-Road Primary',
    size: '2.5m',
    daysToFix: 12,
    issueDate: '2024-03-11',
    dueDate: '2024-03-23',
    assignee: 'Alina',
    assigneeRole: 'analyst',
    progressStatus: 'in-review',
  };

  const carouselItems = [
    { type: 'map', label: 'Geographic Map', icon: Map, future: true },
    { type: 'crack', label: 'Crack Image', icon: Camera, future: false },
    { type: '360', label: '360° Defect View', icon: Camera, future: true },
    { type: 'twin', label: 'Digital Twin View', icon: Eye, future: true },
    { type: 'vr', label: 'VR View', icon: Glasses, future: true },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const isLowConfidence = defect.confidence < 75;

  const startEditing = (fieldKey: string, currentValue: string) => {
    setEditingField(fieldKey);
    setEditValues(prev => ({ ...prev, [fieldKey]: currentValue }));
  };

  const commitEdit = (fieldKey: string, section: string) => {
    // Save the edit
    setEditingField(null);
    // Mark section as confirmed (kept for internal state, but not used for styling)
    if (!confirmedSections.includes(section)) {
      setConfirmedSections(prev => [...prev, section]);
    }
    // Mark field as reviewed
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const acceptSuggestion = (fieldKey: string) => {
    // Mark field as reviewed without editing
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const getPriorityColor = () => {
    switch (defect.priority) {
      case 'critical': return '#C8102E';
      case 'urgent': return '#FF6B00';
      case 'medium': return '#FFB800';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityBorderStyle = () => {
    const color = getPriorityColor();
    return {
      borderLeft: `8px solid ${color}`,
      boxShadow: `inset 8px 0 0 ${color}40`
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Image Carousel - Desktop size */}
      <div className="relative bg-gray-800 h-[600px]" style={getPriorityBorderStyle()}>
        {/* Carousel Content */}
        <div className="relative h-full">
          {carouselItems.map((item, index) => (
            <div
              key={item.type}
              className={`absolute inset-0 transition-opacity duration-300 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background placeholder */}
              <div className="w-full h-full bg-gray-700 flex flex-col items-center justify-center">
                {item.type === 'crack' && !item.future ? (
                  <img 
                    src="figma:asset/8f75fa0c43088e8286910ad8ebc236033bde2f60.png"
                    alt="Crack defect"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <item.icon className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                    <div className="text-lg text-gray-300 font-medium mb-2">
                      {item.label}
                    </div>
                    {item.future && (
                      <div className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full inline-block">
                        Coming Soon
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Priority Badge - Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <div
            className="px-4 py-2 rounded-lg font-bold text-white shadow-lg flex items-center gap-2 text-sm uppercase tracking-wide"
            style={{ backgroundColor: getPriorityColor() }}
          >
            <AlertCircle className="w-5 h-5" />
            {defect.priority} Priority
          </div>
        </div>

        {/* Overlay Controls - Different styling from carousel arrows */}
        <div className="absolute top-4 right-4 flex gap-3 items-center z-20">
          <button
            onClick={() => navigate(`/persona/${personaId}`)}
            className="w-10 h-10 bg-[#4b5563] rounded-full flex items-center justify-center shadow-lg hover:bg-[#374151] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <button
            className="w-10 h-10 bg-[#4b5563] rounded-full flex items-center justify-center shadow-lg hover:bg-[#374151] transition-colors"
            onClick={() => navigate(`/persona/${personaId}/defect/${defectId}/share`)}
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Carousel Navigation - White arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white px-8 py-8" style={getPriorityBorderStyle()}>
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{defect.type}</h1>
            {isLowConfidence && (
              <div className="w-6 h-6 rounded-full bg-red-100 border-2 border-red-500 flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">?</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Review computer vision crack identification and check repair strategy
          </p>
        </div>

        {/* Confirmation Question */}
        {!isDefectConfirmed && (
          <div className="mb-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
            <div className="flex items-start gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-1">Confirm Defect Type</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Select the defect classification to unlock AI analytics
                </p>
                <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-100/50 rounded px-2 py-1.5 inline-flex">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Confirming will unlock Raw GP Analytics for review</span>
                </div>
              </div>
            </div>

            {/* Defect Type Dropdown and Button - Desktop Layout */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Defect Classification
                </label>
                <select
                  value={selectedDefectType}
                  onChange={(e) => setSelectedDefectType(e.target.value)}
                  className="w-full bg-white border-2 border-blue-300 rounded-lg px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select defect type...</option>
                  <option value="urgent-pothole">Urgent Pothole</option>
                  <option value="medium-pothole">Medium-sized Pothole</option>
                  <option value="cracking">Cracking</option>
                  <option value="false-positive">False Positive</option>
                  <option value="not-sure">Not Sure</option>
                </select>
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  if (selectedDefectType) {
                    setIsDefectConfirmed(true);
                  }
                }}
                disabled={!selectedDefectType}
                className={`md:w-auto w-full px-8 py-3 rounded-lg font-semibold transition-colors ${
                  selectedDefectType
                    ? 'bg-[#4b5563] text-white hover:bg-[#374151]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Summary Icons Row */}
        <div className="mb-8 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {/* Task Owner */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mb-1">
                <span className="text-white text-xs font-bold">AL</span>
              </div>
              <span className="text-xs text-gray-500">Owner</span>
              <span className="text-xs font-medium text-gray-900">{defect.assignee}</span>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Location</span>
              <span className="text-xs font-medium text-gray-900">{defect.location}</span>
            </div>

            {/* Priority */}
            <div className="flex flex-col items-center text-center">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: getPriorityColor() + '20' }}
              >
                <AlertCircle className="w-5 h-5" style={{ color: getPriorityColor() }} />
              </div>
              <span className="text-xs text-gray-500">Priority</span>
              <span className="text-xs font-medium text-gray-900 capitalize">{defect.priority}</span>
            </div>

            {/* AI Confidence */}
            <div className="flex flex-col items-center text-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                isLowConfidence ? 'bg-orange-100' : 'bg-green-100'
              }`}>
                <Lightbulb className={`w-5 h-5 ${isLowConfidence ? 'text-orange-600' : 'text-green-600'}`} />
              </div>
              <span className="text-xs text-gray-500">AI Conf.</span>
              <span className={`text-xs font-bold ${isLowConfidence ? 'text-orange-600' : 'text-green-600'}`}>
                {defect.confidence}%
              </span>
            </div>

            {/* Progress */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium text-gray-900 capitalize">{defect.progressStatus.replace('-', ' ')}</span>
            </div>

            {/* Days to Fix */}
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-1">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-xs text-gray-500">Days to Fix</span>
              <span className="text-xs font-bold text-amber-600">{defect.daysToFix}d</span>
            </div>
          </div>
        </div>

        {/* Collapsible Sections - Desktop Multi-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: ID & Location */}
          <div className="space-y-4">
          {/* ID Section */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('id')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">ID</span>
              </div>
              {expandedSections.includes('id') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('id') && (
              <div className="px-4 pb-4 space-y-3 bg-white">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Case Number</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.id}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Issue Date</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.issueDate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Due Date</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.dueDate}</p>
                </div>
                <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 rounded-lg flex items-center justify-between px-4 transition-colors border border-blue-200">
                  <span>Similar Or Nearby</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Location Section */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('location')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Location</span>
              </div>
              {expandedSections.includes('location') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('location') && (
              <div className="px-4 pb-4 space-y-3 bg-white">
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">GPS</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.gps}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Chainage</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.chainage}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Road Name And Type</span>
                  <p className="text-sm text-gray-900 mt-1">{defect.location} - {defect.roadType}</p>
                </div>
              </div>
            )}
          </div>
          </div>

          {/* Middle Column: History */}
          <div className="space-y-4">
          {/* History Section - With editable Surface Material */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('history')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">History</span>
              </div>
              {expandedSections.includes('history') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('history') && (
              <div className="px-4 pb-4 space-y-3 bg-white">
                {/* Surface Material - Editable */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Surface Material</span>
                    {editingField !== 'surfaceMaterial' && (
                      <button 
                        onClick={() => startEditing('surfaceMaterial', 'Asphalt concrete')}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {editingField === 'surfaceMaterial' ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValues.surfaceMaterial || 'Asphalt concrete'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, surfaceMaterial: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('surfaceMaterial', 'history')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.surfaceMaterial || 'Asphalt concrete'}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-sm font-semibold text-gray-700">Road Layers</span>
                  <p className="text-sm text-gray-900 mt-1">Wearing course 40mm, binder 60mm</p>
                </div>
              </div>
            )}
          </div>
          </div>

          {/* Right Column: Raw GP Analytics - Only shown after confirmation */}
          {isDefectConfirmed && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Raw GP Analytics</h2>
              </div>
              <div className="space-y-4">
                {/* Insights Section - With editable Defect Size */}
                <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('insights')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Lightbulb className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Insights</span>
              </div>
              {expandedSections.includes('insights') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('insights') && (
              <div className="px-4 pb-4 space-y-4 bg-white">
                {/* Defect Size - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('defectSize') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Defect Size</span>
                      {reviewedFields.includes('defectSize') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'defectSize' && !reviewedFields.includes('defectSize') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('defectSize')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('defectSize', defect.size)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'defectSize' ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValues.defectSize || defect.size}
                        onChange={(e) => setEditValues(prev => ({ ...prev, defectSize: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('defectSize', 'insights')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.defectSize || defect.size}</p>
                  )}
                </div>

                {/* Urgency - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('urgency') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Urgency</span>
                      {reviewedFields.includes('urgency') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'urgency' && !reviewedFields.includes('urgency') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('urgency')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('urgency', editValues.urgency || 'Medium - requires attention within 14 days')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'urgency' ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValues.urgency || 'Medium - requires attention within 14 days'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, urgency: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('urgency', 'insights')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.urgency || 'Medium - requires attention within 14 days'}</p>
                  )}
                </div>

                {/* Type - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('type') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Type</span>
                      {reviewedFields.includes('type') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'type' && !reviewedFields.includes('type') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('type')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('type', editValues.type || 'Longitudinal cracking - structural concern')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'type' ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editValues.type || 'Longitudinal cracking - structural concern'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('type', 'insights')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.type || 'Longitudinal cracking - structural concern'}</p>
                  )}
                </div>

                {/* Severity - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('severity') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Severity</span>
                      {reviewedFields.includes('severity') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'severity' && !reviewedFields.includes('severity') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('severity')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('severity', editValues.severity || 'Moderate - width 5-10mm, potential for deterioration')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'severity' ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValues.severity || 'Moderate - width 5-10mm, potential for deterioration'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, severity: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('severity', 'insights')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.severity || 'Moderate - width 5-10mm, potential for deterioration'}</p>
                  )}
                </div>

                {/* Repair Strategy - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('repairStrategy') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Repair Strategy</span>
                      {reviewedFields.includes('repairStrategy') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'repairStrategy' && !reviewedFields.includes('repairStrategy') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('repairStrategy')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('repairStrategy', editValues.repairStrategy || 'Crack sealing recommended, monitor for expansion')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'repairStrategy' ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValues.repairStrategy || 'Crack sealing recommended, monitor for expansion'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, repairStrategy: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('repairStrategy', 'insights')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.repairStrategy || 'Crack sealing recommended, monitor for expansion'}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Decisions Section - Editable */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('decisions')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Decisions</span>
              </div>
              {expandedSections.includes('decisions') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('decisions') && (
              <div className="px-4 pb-4 space-y-4 bg-white">
                {/* Send Urgent Request - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('urgentRequest') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Send Urgent Request?</span>
                      {reviewedFields.includes('urgentRequest') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'urgentRequest' && !reviewedFields.includes('urgentRequest') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('urgentRequest')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('urgentRequest', editValues.urgentRequest || 'No')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'urgentRequest' ? (
                    <div className="space-y-2">
                      <select
                        value={editValues.urgentRequest || 'No'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, urgentRequest: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('urgentRequest', 'decisions')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.urgentRequest || 'No'}</p>
                  )}
                </div>

                {/* Automated Repair - Reviewable & Editable */}
                <div className={`rounded-lg p-3 ${
                  reviewedFields.includes('automatedRepair') 
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-red-50/30 border-2 border-red-300/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-700">Automated Repair?</span>
                      {reviewedFields.includes('automatedRepair') && (
                        <Check className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    {editingField !== 'automatedRepair' && !reviewedFields.includes('automatedRepair') && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => acceptSuggestion('automatedRepair')}
                          className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                          title="Accept AI suggestion"
                        >
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button 
                          onClick={() => startEditing('automatedRepair', editValues.automatedRepair || 'Under review')}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingField === 'automatedRepair' ? (
                    <div className="space-y-2">
                      <select
                        value={editValues.automatedRepair || 'Under review'}
                        onChange={(e) => setEditValues(prev => ({ ...prev, automatedRepair: e.target.value }))}
                        className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Under review">Under review</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => commitEdit('automatedRepair', 'decisions')}
                          className="flex-1 bg-[#4b5563] text-white py-2 rounded font-medium text-sm hover:bg-[#374151]"
                        >
                          Commit
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-medium text-sm hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900">{editValues.automatedRepair || 'Under review'}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Calendar Section */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('calendar')}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Calendar</span>
              </div>
              {expandedSections.includes('calendar') ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            {expandedSections.includes('calendar') && (
              <div className="px-4 pb-4">
                <div className="bg-white rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Edit Due Date</h3>
                  {/* Simple calendar placeholder */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <div key={i} className="text-center text-xs font-medium text-gray-600">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 5;
                      const isToday = day === 8;
                      return (
                        <button
                          key={i}
                          className={`aspect-square rounded-full flex items-center justify-center text-sm ${
                            day < 1 || day > 31
                              ? 'text-gray-300'
                              : isToday
                              ? 'bg-gray-800 text-white font-bold'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {day > 0 && day <= 31 ? day : ''}
                        </button>
                      );
                    })}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Select Dates</h4>
                    {[8, 9, 10].map((day) => (
                      <div key={day} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <input type="checkbox" className="w-4 h-4" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{day.toString().padStart(2, '0')}</div>
                          <div className="text-xs text-gray-500">Month</div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <div>⛅ 11:00 - 14:00</div>
                          <div className="text-gray-500">optimal window</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
              </div>
            </div>
          )}

          {/* Placeholder column when analytics not confirmed */}
          {!isDefectConfirmed && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                <Lightbulb className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  Confirm defect type above to view AI analytics
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          <button
            onClick={() => navigate(`/persona/${personaId}/defect/${defectId}/share`)}
            className="px-8 h-[44px] bg-white border-2 border-[#4b5563] text-[#4b5563] rounded-lg font-bold text-base hover:bg-gray-50 transition-colors"
          >
            Share
          </button>
          <button
            onClick={() => navigate(`/persona/${personaId}/defect/${defectId}/confirmation`)}
            className="px-8 h-[44px] bg-[#4b5563] text-[#e6edf2] rounded-lg font-bold text-base hover:bg-[#374151] transition-colors"
          >
            Submit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}