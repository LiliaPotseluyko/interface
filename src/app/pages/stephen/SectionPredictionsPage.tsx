import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronDown, 
  ChevronUp, 
  Edit2, 
  Check,
  TrendingUp,
  Calendar,
  Lightbulb,
  Clock,
  GitCompare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function SectionPredictionsPage() {
  const navigate = useNavigate();
  const { personaId, sectionId } = useParams<{ personaId: string; sectionId: string }>();
  
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [reviewedFields, setReviewedFields] = useState<string[]>([]);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  // Mock predictions data
  const predictions = {
    sectionId: sectionId || 'section-01',
    sectionNumber: '01',
    roadName: 'A14',
    description: 'Woolpit to Hagley Bridge',
    
    overview: {
      remainingServiceLife: { value: '12-15 years', confidence: 68, aiGenerated: true },
      predictedFailureWindow: { value: '2036-2039', confidence: 65, aiGenerated: true },
      deteriorationTrend: { value: 'Accelerating (8-12% per year)', confidence: 82, aiGenerated: true },
      predictionConfidence: { value: 'Medium - 68%', confidence: 68, aiGenerated: true },
    },
    
    forecast: {
      oneYear: { value: 'Fair (Health Score: 58)', confidence: 75, aiGenerated: true },
      threeYear: { value: 'Poor (Health Score: 42)', confidence: 70, aiGenerated: true },
      fiveYear: { value: 'Very Poor (Health Score: 28)', confidence: 65, aiGenerated: true },
      accelerationRate: { value: '+2.5% per year', confidence: 72, aiGenerated: true },
      failureProbability: { value: '18% within 5 years', confidence: 68, aiGenerated: true },
    },
    
    recommendation: {
      treatmentType: { value: 'Resurfacing', confidence: 71, aiGenerated: true },
      lifeExtension: { value: '12-18 years', confidence: 74, aiGenerated: true },
      estimatedCost: { value: '£285,000 - £340,000', confidence: 88, aiGenerated: false },
      recommendationConfidence: { value: 'Medium-High (71%)', confidence: 71, aiGenerated: true },
    },
    
    interventionWindow: {
      earliestYear: { value: '2026', confidence: 85, aiGenerated: false },
      latestYear: { value: '2028', confidence: 73, aiGenerated: true },
      delayRisk: { value: 'High - structural damage likely after 2028', confidence: 69, aiGenerated: true },
      costIncrease: { value: '+45% if delayed beyond 2028', confidence: 66, aiGenerated: true },
    },
    
    scenarios: [
      {
        id: 'immediate',
        name: 'Immediate Repair',
        description: 'Resurface in 2026',
        costEstimate: '£285,000',
        lifeExtension: '15-18 years',
        failureRisk: 'Very Low (2%)',
        networkImpact: 'Minimal - scheduled maintenance',
        recommended: true,
      },
      {
        id: 'delayed',
        name: 'Delayed Repair',
        description: 'Resurface in 2028',
        costEstimate: '£410,000',
        lifeExtension: '10-12 years',
        failureRisk: 'Medium (22%)',
        networkImpact: 'Moderate - possible emergency closure',
        recommended: false,
      },
      {
        id: 'minimal',
        name: 'Minimal Maintenance',
        description: 'Patch repairs only',
        costEstimate: '£85,000 per year',
        lifeExtension: '3-5 years',
        failureRisk: 'High (58%)',
        networkImpact: 'High - frequent disruption',
        recommended: false,
      },
    ],
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const startEditing = (fieldKey: string, currentValue: string) => {
    setEditingField(fieldKey);
    setEditValues(prev => ({ ...prev, [fieldKey]: currentValue }));
  };

  const commitEdit = (fieldKey: string) => {
    setEditingField(null);
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValues({});
  };

  const acceptSuggestion = (fieldKey: string) => {
    if (!reviewedFields.includes(fieldKey)) {
      setReviewedFields(prev => [...prev, fieldKey]);
    }
  };

  const isLowConfidence = (confidence: number) => confidence < 75;

  const renderField = (
    label: string,
    fieldKey: string,
    data: { value: string; confidence: number; aiGenerated: boolean },
    isTextarea: boolean = false
  ) => {
    const needsReview = data.aiGenerated && isLowConfidence(data.confidence);
    const isReviewed = reviewedFields.includes(fieldKey);

    return (
      <div className={`rounded-lg p-3 ${
        needsReview && !isReviewed
          ? 'bg-red-50/30 border-2 border-red-300/50' 
          : isReviewed 
          ? 'bg-green-50 border-2 border-green-400'
          : 'bg-gray-50'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            {isReviewed && <Check className="w-4 h-4 text-green-600" />}
            {needsReview && !isReviewed && (
              <div className="w-4 h-4 rounded-full bg-red-100 border border-red-500 flex items-center justify-center">
                <span className="text-red-600 font-bold text-xs">?</span>
              </div>
            )}
          </div>
          {editingField !== fieldKey && needsReview && !isReviewed && (
            <div className="flex gap-2">
              <button 
                onClick={() => acceptSuggestion(fieldKey)}
                className="w-7 h-7 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors"
                title="Accept AI prediction"
              >
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button 
                onClick={() => startEditing(fieldKey, editValues[fieldKey] || data.value)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {editingField === fieldKey ? (
          <div className="space-y-2">
            {isTextarea ? (
              <textarea
                value={editValues[fieldKey] || data.value}
                onChange={(e) => setEditValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
                className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
              />
            ) : (
              <input
                type="text"
                value={editValues[fieldKey] || data.value}
                onChange={(e) => setEditValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
                className="w-full border-2 border-blue-400 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => commitEdit(fieldKey)}
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
          <div>
            <p className="text-sm text-gray-900">{editValues[fieldKey] || data.value}</p>
            {data.aiGenerated && (
              <div className="flex items-center gap-1 mt-1">
                <Lightbulb className={`w-3 h-3 ${isLowConfidence(data.confidence) ? 'text-orange-500' : 'text-green-500'}`} />
                <span className={`text-xs ${isLowConfidence(data.confidence) ? 'text-orange-600' : 'text-green-600'}`}>
                  AI: {data.confidence}%
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-64">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/persona/${personaId}/section/${sectionId}`)}
            className="p-2 hover:bg-gray-100 rounded-full -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Predictions</h1>
            <p className="text-sm text-gray-600">
              {predictions.roadName} Section {predictions.sectionNumber} - {predictions.description}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Prediction Overview Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('overview')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Prediction Overview</span>
            </div>
            {expandedSections.includes('overview') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('overview') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                High-level summary of AI analysis
              </div>
              
              {renderField('Remaining Service Life', 'remainingServiceLife', predictions.overview.remainingServiceLife)}
              {renderField('Predicted Failure Window', 'predictedFailureWindow', predictions.overview.predictedFailureWindow)}
              {renderField('Current Deterioration Trend', 'deteriorationTrend', predictions.overview.deteriorationTrend)}
              {renderField('Confidence Level of Prediction', 'predictionConfidence', predictions.overview.predictionConfidence)}
            </div>
          )}
        </div>

        {/* Deterioration Forecast Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('forecast')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Deterioration Forecast</span>
            </div>
            {expandedSections.includes('forecast') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('forecast') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Short- and long-term condition forecasts
              </div>
              
              {renderField('1 Year Condition Prediction', 'oneYear', predictions.forecast.oneYear)}
              {renderField('3 Year Condition Prediction', 'threeYear', predictions.forecast.threeYear)}
              {renderField('5 Year Condition Prediction', 'fiveYear', predictions.forecast.fiveYear)}
              {renderField('Deterioration Acceleration Rate', 'accelerationRate', predictions.forecast.accelerationRate)}
              {renderField('Failure Probability Within Time Horizon', 'failureProbability', predictions.forecast.failureProbability)}
            </div>
          )}
        </div>

        {/* AI Repair Recommendation Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('recommendation')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">AI Repair Recommendation</span>
            </div>
            {expandedSections.includes('recommendation') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('recommendation') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Suggested intervention based on current condition and forecasts
              </div>
              
              {renderField('Recommended Treatment Type', 'treatmentType', predictions.recommendation.treatmentType)}
              {renderField('Expected Life Extension', 'lifeExtension', predictions.recommendation.lifeExtension)}
              {renderField('Estimated Repair Cost', 'estimatedCost', predictions.recommendation.estimatedCost)}
              {renderField('Confidence Level of Recommendation', 'recommendationConfidence', predictions.recommendation.recommendationConfidence)}
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                <div className="text-xs font-semibold text-blue-900 mb-1">Treatment Options</div>
                <div className="text-xs text-blue-700">
                  Surface treatment • Patch repair • Resurfacing • Full reconstruction
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Optimal Intervention Window Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('intervention')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Optimal Intervention Window</span>
            </div>
            {expandedSections.includes('intervention') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('intervention') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Best timing for repair
              </div>
              
              {renderField('Earliest Repair Year', 'earliestYear', predictions.interventionWindow.earliestYear)}
              {renderField('Latest Repair Year Before Major Deterioration', 'latestYear', predictions.interventionWindow.latestYear)}
              {renderField('Risk If Repair Is Delayed', 'delayRisk', predictions.interventionWindow.delayRisk, true)}
              {renderField('Cost Increase If Postponed', 'costIncrease', predictions.interventionWindow.costIncrease)}
              
              {/* Timeline Visual */}
              <div className="bg-gradient-to-r from-green-50 via-yellow-50 to-red-50 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700">Repair Window Timeline</span>
                </div>
                <div className="relative h-8 bg-white rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-30"></div>
                  <div className="absolute left-[25%] top-0 bottom-0 w-0.5 bg-green-600"></div>
                  <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-red-600"></div>
                  <div className="absolute left-[25%] -top-6 text-xs font-semibold text-green-700">2026</div>
                  <div className="absolute left-[75%] -top-6 text-xs font-semibold text-red-700">2028</div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-2">
                  <span>Optimal window</span>
                  <span>High risk zone</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scenario Comparison Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('scenarios')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <GitCompare className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Scenario Comparison</span>
            </div>
            {expandedSections.includes('scenarios') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('scenarios') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Compare repair strategies to make informed decisions
              </div>
              
              {predictions.scenarios.map((scenario) => (
                <div 
                  key={scenario.id}
                  className={`rounded-lg p-4 border-2 cursor-pointer transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-blue-500 bg-blue-50'
                      : scenario.recommended
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{scenario.name}</h4>
                        {scenario.recommended && (
                          <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{scenario.description}</p>
                    </div>
                    {selectedScenario === scenario.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-600">Cost:</span>
                      <div className="font-semibold text-gray-900">{scenario.costEstimate}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Life Extension:</span>
                      <div className="font-semibold text-gray-900">{scenario.lifeExtension}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Failure Risk:</span>
                      <div className="font-semibold text-gray-900">{scenario.failureRisk}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Network Impact:</span>
                      <div className="font-semibold text-gray-900">{scenario.networkImpact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decision Actions Section */}
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('actions')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Decision Actions</span>
            </div>
            {expandedSections.includes('actions') ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {expandedSections.includes('actions') && (
            <div className="px-4 pb-4 space-y-3 bg-white">
              <div className="text-xs text-gray-500 italic mb-3">
                Actions available to the analyst
              </div>
              
              <button className="w-full bg-[#4b5563] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#374151] transition-colors">
                <Check className="w-5 h-5" />
                Accept AI Recommendation
              </button>
              
              <button className="w-full bg-white text-[#4b5563] font-semibold py-3 rounded-lg border-2 border-[#4b5563] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <Edit2 className="w-5 h-5" />
                Modify Repair Strategy
              </button>
              
              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                <TrendingUp className="w-5 h-5" />
                Send to Manager for Approval
              </button>
              
              <button className="w-full bg-white text-blue-600 font-semibold py-3 rounded-lg border-2 border-blue-600 flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                <Calendar className="w-5 h-5" />
                Add to Maintenance Schedule
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
