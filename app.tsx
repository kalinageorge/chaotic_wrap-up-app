import React, { useState } from 'react';
import { Heart, Calendar, Camera, Sparkles, Trophy, MapPin, Brain, Zap, Coffee, ArrowRight, ArrowLeft, Upload, X, Plus, Minus } from 'lucide-react';

const YearlyReviewGenerator = () => {
  const [step, setStep] = useState('form'); // 'form' or 'presentation'
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    year: '2024',
    romance: {
      romanticDates: 0,
      breakups: 0,
      relationships: 0,
      presentsFromObsessedMen: 0
    },
    lifeEvents: [],
    trips: [],
    hobbies: [],
    realizations: [],
    counts: [],
    mentalBreakdowns: 0,
    hotOutfits: 0,
    photos: []
  });

  const [newLifeEvent, setNewLifeEvent] = useState('');
  const [newTrip, setNewTrip] = useState({ month: '', destination: '' });
  const [newHobby, setNewHobby] = useState('');
  const [newRealization, setNewRealization] = useState('');
  const [newCount, setNewCount] = useState({ activity: '', count: 0 });

  const gradients = [
    'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600',
    'bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500',
    'bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600',
    'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
    'bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600',
    'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    'bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600',
    'bg-gradient-to-br from-red-400 via-pink-500 to-orange-500',
    'bg-gradient-to-br from-violet-500 via-purple-600 to-pink-600'
  ];

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                 'July', 'August', 'September', 'October', 'November', 'December'];

  const updateFormData = (section, key, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const addToArray = (arrayKey, item) => {
    if (item && item.trim()) {
      setFormData(prev => ({
        ...prev,
        [arrayKey]: [...prev[arrayKey], item]
      }));
    }
  };

  const removeFromArray = (arrayKey, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayKey]: prev[arrayKey].filter((_, i) => i !== index)
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photos: [...prev.photos, {
            id: Date.now() + Math.random(),
            src: e.target.result,
            name: file.name
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (photoId) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(photo => photo.id !== photoId)
    }));
  };

  const generatePresentation = () => {
    setStep('presentation');
    setCurrentSlide(0);
  };

  const generateSlides = () => {
    const slides = [];
    let gradientIndex = 0;
    const getGradient = () => gradients[gradientIndex++ % gradients.length];

    // Title slide
    slides.push({
      id: 'title',
      type: 'title',
      title: `${formData.name}'s ${formData.year} Year in Review`,
      subtitle: 'A Year of Growth, Adventures & Chaos ✨',
      background: getGradient(),
      icon: Heart
    });

    // Romance stats
    if (Object.values(formData.romance).some(val => val > 0)) {
      slides.push({
        id: 'romance',
        type: 'stats',
        title: '💕 Romance Report',
        stats: [
          { label: 'Romantic dates', value: formData.romance.romanticDates, emoji: '🥰' },
          { label: 'Breakups survived', value: formData.romance.breakups, emoji: '💔' },
          { label: 'Relationships', value: formData.romance.relationships, emoji: '👫' },
          { label: 'Presents from obsessed men', value: formData.romance.presentsFromObsessedMen, emoji: '🎁' }
        ].filter(stat => stat.value > 0),
        background: getGradient()
      });
    }

    // Life events
    if (formData.lifeEvents.length > 0) {
      slides.push({
        id: 'life-events',
        type: 'list',
        title: '🌟 Major Life Events',
        items: formData.lifeEvents,
        background: getGradient(),
        icon: Zap
      });
    }

    // Trips
    if (formData.trips.length > 0) {
      slides.push({
        id: 'trips',
        type: 'timeline',
        title: '✈️ Adventures This Year',
        trips: formData.trips,
        background: getGradient(),
        icon: MapPin
      });
    }

    // Photo slides - create multiple slides if many photos
    if (formData.photos.length > 0) {
      const photosPerSlide = 4;
      const photoSlides = Math.ceil(formData.photos.length / photosPerSlide);
      
      for (let i = 0; i < photoSlides; i++) {
        const startIndex = i * photosPerSlide;
        const slidePhotos = formData.photos.slice(startIndex, startIndex + photosPerSlide);
        
        slides.push({
          id: `photos-${i}`,
          type: 'photos',
          title: i === 0 ? '📸 Memory Lane' : `📸 More Memories (${i + 1})`,
          photos: slidePhotos,
          background: getGradient()
        });
      }
    }

    // Hobbies
    if (formData.hobbies.length > 0) {
      slides.push({
        id: 'hobbies',
        type: 'list',
        title: '🎨 New Hobbies Unlocked',
        items: formData.hobbies,
        background: getGradient(),
        icon: Sparkles
      });
    }

    // Realizations
    if (formData.realizations.length > 0) {
      slides.push({
        id: 'realizations',
        type: 'quotes',
        title: '💭 Deep Life Realizations',
        quotes: formData.realizations,
        background: getGradient(),
        icon: Brain
      });
    }

    // Fun counts
    const allCounts = [
      ...formData.counts,
      ...(formData.mentalBreakdowns > 0 ? [{ activity: 'Mental breakdowns', count: formData.mentalBreakdowns }] : []),
      ...(formData.hotOutfits > 0 ? [{ activity: 'Hot outfits served', count: formData.hotOutfits }] : [])
    ];

    if (allCounts.length > 0) {
      slides.push({
        id: 'counts',
        type: 'stats',
        title: '📊 Year by the Numbers',
        stats: allCounts.map(item => ({
          label: item.activity,
          value: item.count,
          emoji: getCountEmoji(item.activity)
        })),
        background: getGradient()
      });
    }

    // Closing slide
    slides.push({
      id: 'closing',
      type: 'title',
      title: 'Here\'s to Another Year!',
      subtitle: 'Cheers to more adventures, growth, and friendship 🥂',
      background: getGradient(),
      icon: Trophy
    });

    return slides;
  };

  const getCountEmoji = (activity) => {
    const lower = activity.toLowerCase();
    if (lower.includes('drunk') || lower.includes('drink')) return '🍻';
    if (lower.includes('breakdown') || lower.includes('mental')) return '😭';
    if (lower.includes('outfit') || lower.includes('hot')) return '🔥';
    if (lower.includes('coffee')) return '☕';
    if (lower.includes('workout') || lower.includes('gym')) return '💪';
    if (lower.includes('cry') || lower.includes('tear')) return '😢';
    if (lower.includes('laugh')) return '😂';
    return '✨';
  };

  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-2xl text-white/90 drop-shadow">
                {slide.subtitle}
              </p>
            </div>
            <div className="flex justify-center">
              {slide.icon && <slide.icon className="w-16 h-16 text-white/80" />}
            </div>
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
              {slide.title}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {slide.stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl mb-2">{stat.emoji}</div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
              {slide.title}
            </h2>
            <div className="space-y-4">
              {slide.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="text-2xl text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
              {slide.title}
            </h2>
            <div className="space-y-4">
              {slide.trips.map((trip, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6 text-white" />
                    <span className="text-2xl text-white font-semibold">{trip.destination}</span>
                  </div>
                  <span className="text-lg text-white/80">{trip.month}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'photos':
        return (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
              {slide.title}
            </h2>
            <div className={`grid ${slide.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              {slide.photos.map((photo, index) => (
                <div key={photo.id} className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                  <img 
                    src={photo.src} 
                    alt={photo.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'quotes':
        return (
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-white text-center drop-shadow-lg">
              {slide.title}
            </h2>
            <div className="space-y-6">
              {slide.quotes.map((quote, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                  <span className="text-2xl text-white italic">"{quote}"</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Slide content</div>;
    }
  };

  if (step === 'presentation') {
    const slides = generateSlides();
    const currentSlideData = slides[currentSlide];

    return (
      <div className="min-h-screen bg-gray-100">
        <div className={`min-h-screen ${currentSlideData.background} p-12 flex flex-col justify-center relative`}>
          {renderSlide(currentSlideData)}
          
          {/* Navigation */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full disabled:opacity-50 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            
            <span className="text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              {currentSlide + 1} of {slides.length}
            </span>
            
            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full disabled:opacity-50 hover:bg-white/30 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Back to form button */}
          <button
            onClick={() => setStep('form')}
            className="absolute top-6 left-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            ← Edit Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Girlfriend Yearly Review Generator
            </h1>
            <p className="text-gray-600">Answer some questions and get a beautiful presentation automatically!</p>
          </div>

          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Basic Info
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => updateFormData(null, 'name', e.target.value)}
                  className="p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2024)"
                  value={formData.year}
                  onChange={(e) => updateFormData(null, 'year', e.target.value)}
                  className="p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Romance */}
            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-pink-800 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Romance Report
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Romantic dates</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.romance.romanticDates}
                    onChange={(e) => updateFormData('romance', 'romanticDates', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Breakups</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.romance.breakups}
                    onChange={(e) => updateFormData('romance', 'breakups', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Relationships</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.romance.relationships}
                    onChange={(e) => updateFormData('romance', 'relationships', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-pink-700 mb-1">Presents from obsessed men</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.romance.presentsFromObsessedMen}
                    onChange={(e) => updateFormData('romance', 'presentsFromObsessedMen', parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Life Events */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Major Life Events
              </h3>
              <div className="space-y-3">
                {formData.lifeEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 p-2 bg-blue-100 rounded">{event}</span>
                    <button
                      onClick={() => removeFromArray('lifeEvents', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g., Started new job, got an apartment, got a pet..."
                    value={newLifeEvent}
                    onChange={(e) => setNewLifeEvent(e.target.value)}
                    className="flex-1 p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      addToArray('lifeEvents', newLifeEvent);
                      setNewLifeEvent('');
                    }}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Trips */}
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Trips This Year
              </h3>
              <div className="space-y-3">
                {formData.trips.map((trip, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 p-2 bg-green-100 rounded">
                      {trip.destination} - {trip.month}
                    </span>
                    <button
                      onClick={() => removeFromArray('trips', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <select
                    value={newTrip.month}
                    onChange={(e) => setNewTrip({...newTrip, month: e.target.value})}
                    className="p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Destination"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                    className="flex-1 p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => {
                      if (newTrip.month && newTrip.destination) {
                        addToArray('trips', newTrip);
                        setNewTrip({ month: '', destination: '' });
                      }
                    }}
                    className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Photos & Videos
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-3">
                  {formData.photos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <img 
                        src={photo.src} 
                        alt={photo.name}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(photo.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="flex items-center justify-center p-4 border-2 border-dashed border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors">
                  <Upload className="w-5 h-5 mr-2 text-yellow-600" />
                  <span className="text-yellow-700">Upload photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Hobbies */}
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                New Hobbies Started
              </h3>
              <div className="space-y-3">
                {formData.hobbies.map((hobby, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 p-2 bg-purple-100 rounded">{hobby}</span>
                    <button
                      onClick={() => removeFromArray('hobbies', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g., Photography, Yoga, Cooking..."
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    className="flex-1 p-3 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => {
                      addToArray('hobbies', newHobby);
                      setNewHobby('');
                    }}
                    className="px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Deep Realizations */}
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-indigo-800 mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Deep Life Realizations
              </h3>
              <div className="space-y-3">
                {formData.realizations.map((realization, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="flex-1 p-2 bg-indigo-100 rounded italic">"{realization}"</span>
                    <button
                      onClick={() => removeFromArray('realizations', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="e.g., Self-care isn't selfish, boundaries are healthy..."
                    value={newRealization}
                    onChange={(e) => setNewRealization(e.target.value)}
                    className="flex-1 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      addToArray('realizations', newRealization);
                      setNewRealization('');
                    }}
                    className="px-4 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
                  
