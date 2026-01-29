import React, { useState, useEffect } from 'react';
import { useContent } from '../contexts/ContentContext';
import { AppContent, Video, Product, BlogPost, Song, Activity, TeamMember, Quiz, GameItem, Question } from '../types';
import { Trash2, Plus, RotateCcw, Lock, Video as VideoIcon, ShoppingBag, BookOpen, Music, Users, Puzzle, Palette, Type, Search, Gamepad2, LogOut, Save, ArrowLeft, CheckCircle, Edit3, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'texts' | 'videos' | 'products' | 'blog' | 'songs' | 'activities' | 'team' | 'quizzes' | 'games'>('texts');
  const [editLang, setEditLang] = useState<'en' | 'ar'>('ar');
  const [textSearch, setTextSearch] = useState('');
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);

  const navigate = useNavigate();
  
  // Check Session on Mount
  useEffect(() => {
    const session = sessionStorage.getItem('dana_admin_session');
    if (session === 'active') {
        setIsAuthenticated(true);
    }
  }, []);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'dana2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('dana_admin_session', 'active');
    } else {
      alert('Incorrect Credentials');
    }
  };

  // Logout Handler
  const handleLogout = () => {
      setIsAuthenticated(false);
      setUsername('');
      setPassword('');
      sessionStorage.removeItem('dana_admin_session');
      navigate('/');
  };

  // Export Data (Save) Handler
  const handleExport = () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "dana_content_backup.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  // Generic Delete Handler (Index Based - 100% Reliable)
  const handleDelete = (category: keyof AppContent['en'], index: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    const newContent = {
        ...content,
        [editLang]: {
            ...content[editLang],
            // Remove item by index
            [category]: (content[editLang][category] as any[]).filter((_, i) => i !== index)
        }
    };
    updateContent(newContent);
  };

  // Generic Update Field Handler (Index Based)
  const handleUpdateItem = (category: keyof AppContent['en'], index: number, field: string, value: any) => {
    const langData = content[editLang];
    // @ts-ignore
    const list = langData[category] as any[];

    if (index >= 0 && index < list.length) {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        
        const newContent = {
            ...content,
            [editLang]: {
                ...langData,
                [category]: newList
            }
        };
        updateContent(newContent);
    }
  };

  // Text Translation Handler
  const handleUpdateText = (key: string, value: string) => {
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              translations: {
                  ...content[editLang].translations,
                  [key]: value
              }
          }
      };
      updateContent(newContent);
  };

  // --- Quiz Question Handlers ---
  const getCurrentQuiz = () => {
      return content[editLang].quizzes.find(q => q.id === editingQuizId);
  };

  const handleAddQuestion = () => {
      if (!editingQuizId) return;
      const newQuestion: Question = {
          id: `q_${Date.now()}`,
          text: 'New Question?',
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctIndex: 0
      };
      
      const newContent = { ...content };
      const quizIndex = newContent[editLang].quizzes.findIndex(q => q.id === editingQuizId);
      if (quizIndex > -1) {
          const quiz = { ...newContent[editLang].quizzes[quizIndex] };
          quiz.questions = [...quiz.questions, newQuestion];
          newContent[editLang].quizzes = [...newContent[editLang].quizzes];
          newContent[editLang].quizzes[quizIndex] = quiz;
          updateContent(newContent);
      }
  };

  const handleDeleteQuestion = (qIndex: number) => {
      if (!editingQuizId) return;
      if (!window.confirm("Delete this question?")) return;

      const newContent = { ...content };
      const quizIndex = newContent[editLang].quizzes.findIndex(q => q.id === editingQuizId);
      if (quizIndex > -1) {
          const quiz = { ...newContent[editLang].quizzes[quizIndex] };
          const newQuestions = [...quiz.questions];
          newQuestions.splice(qIndex, 1);
          quiz.questions = newQuestions;
          
          newContent[editLang].quizzes = [...newContent[editLang].quizzes];
          newContent[editLang].quizzes[quizIndex] = quiz;
          updateContent(newContent);
      }
  };

  const handleUpdateQuestionText = (qIndex: number, text: string) => {
      if (!editingQuizId) return;
      const newContent = { ...content };
      const quizIndex = newContent[editLang].quizzes.findIndex(q => q.id === editingQuizId);
      if (quizIndex > -1) {
           const quiz = { ...newContent[editLang].quizzes[quizIndex] };
           const questions = [...quiz.questions];
           questions[qIndex] = { ...questions[qIndex], text };
           quiz.questions = questions;
           newContent[editLang].quizzes[quizIndex] = quiz;
           updateContent(newContent);
      }
  };

  const handleUpdateOption = (qIndex: number, oIndex: number, text: string) => {
      if (!editingQuizId) return;
      const newContent = { ...content };
      const quizIndex = newContent[editLang].quizzes.findIndex(q => q.id === editingQuizId);
      if (quizIndex > -1) {
          const quiz = { ...newContent[editLang].quizzes[quizIndex] };
          const questions = [...quiz.questions];
          const options = [...questions[qIndex].options];
          options[oIndex] = text;
          questions[qIndex] = { ...questions[qIndex], options };
          quiz.questions = questions;
          newContent[editLang].quizzes[quizIndex] = quiz;
          updateContent(newContent);
      }
  };

  const handleUpdateCorrectIndex = (qIndex: number, correctIndex: number) => {
      if (!editingQuizId) return;
      const newContent = { ...content };
      const quizIndex = newContent[editLang].quizzes.findIndex(q => q.id === editingQuizId);
      if (quizIndex > -1) {
          const quiz = { ...newContent[editLang].quizzes[quizIndex] };
          const questions = [...quiz.questions];
          questions[qIndex] = { ...questions[qIndex], correctIndex };
          quiz.questions = questions;
          newContent[editLang].quizzes[quizIndex] = quiz;
          updateContent(newContent);
      }
  };


  // Add Item Handlers
  const addVideo = () => {
    const newVideo: Video = {
        id: `v${Date.now()}`,
        title: 'New Video Title',
        thumbnail: 'https://picsum.photos/640/360',
        category: 'Learning',
        description: 'Description here...',
        youtubeId: 'dQw4w9WgXcQ'
    };
    const newContent = {
        ...content,
        [editLang]: {
            ...content[editLang],
            videos: [newVideo, ...content[editLang].videos]
        }
    };
    updateContent(newContent);
  };

  const addProduct = () => {
      const newProduct: Product = {
          id: `p${Date.now()}`,
          name: 'New Product',
          price: 9.99,
          image: 'https://picsum.photos/400',
          category: 'Toy',
          externalUrl: '#'
      };
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              products: [newProduct, ...content[editLang].products]
          }
      };
      updateContent(newContent);
  };

  const addBlogPost = () => {
      const newBlog: BlogPost = {
          id: `b${Date.now()}`,
          title: 'New Article',
          excerpt: 'Short summary...',
          content: '<p>Write your content here...</p>',
          image: 'https://picsum.photos/800/400',
          date: new Date().toLocaleDateString(),
          author: 'Dana Team'
      };
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              blog: [newBlog, ...content[editLang].blog]
          }
      };
      updateContent(newContent);
  };

  const addSong = () => {
      const newSong: Song = {
          id: `s${Date.now()}`,
          title: 'New Song',
          url: '',
          duration: '3:00'
      };
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              songs: [newSong, ...content[editLang].songs]
          }
      };
      updateContent(newContent);
  };

  const addActivity = () => {
      const newActivity: Activity = {
          id: `a${Date.now()}`,
          title: 'New Activity',
          type: 'Printable',
          isPremium: false,
          image: 'https://picsum.photos/400',
          ageGroup: '3-6'
      };
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              activities: [newActivity, ...content[editLang].activities]
          }
      };
      updateContent(newContent);
  };

  const addTeamMember = () => {
      const newMember: TeamMember = {
          id: `t${Date.now()}`,
          name: 'Name',
          role: 'Role',
          image: 'https://picsum.photos/300',
          bio: 'Bio...'
      };
      const newContent = {
          ...content,
          [editLang]: {
              ...content[editLang],
              team: [...content[editLang].team, newMember]
          }
      };
      updateContent(newContent);
  };
  
  // --- RENDER LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-dana-purple p-3 rounded-full text-white">
                <Lock size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:border-dana-purple outline-none"
              placeholder="Username"
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:border-dana-purple outline-none"
              placeholder="Password"
            />
            <button type="submit" className="w-full bg-dana-blue text-white font-bold py-3 rounded-xl hover:bg-blue-500">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  const currentData = content[editLang];

  const renderSidebarItem = (id: typeof activeTab, label: string, Icon: any) => (
      <button 
        onClick={() => { setActiveTab(id); setEditingQuizId(null); }} 
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === id ? 'bg-dana-purple' : 'hover:bg-gray-800'}`}
      >
          <Icon size={20} /> {label}
      </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white p-6 flex-shrink-0 h-screen overflow-y-auto sticky top-0 flex flex-col">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Lock size={20} className="text-dana-yellow" /> Admin Panel
        </h2>
        
        <div className="mb-8">
            <label className="text-gray-500 text-sm uppercase font-bold tracking-wider mb-2 block">Language</label>
            <div className="flex bg-gray-800 rounded-lg p-1">
                <button 
                    onClick={() => setEditLang('en')}
                    className={`flex-1 py-2 rounded-md font-bold text-sm ${editLang === 'en' ? 'bg-dana-blue text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    English
                </button>
                <button 
                    onClick={() => setEditLang('ar')}
                    className={`flex-1 py-2 rounded-md font-bold text-sm ${editLang === 'ar' ? 'bg-dana-green text-white' : 'text-gray-400 hover:text-white'}`}
                >
                    العربية
                </button>
            </div>
        </div>

        <nav className="space-y-2 flex-grow">
            {renderSidebarItem('texts', 'Site Content', Type)}
            {renderSidebarItem('videos', 'Videos', VideoIcon)}
            {renderSidebarItem('activities', 'Activities', Palette)}
            {renderSidebarItem('games', 'Games', Gamepad2)}
            {renderSidebarItem('quizzes', 'Quizzes', Puzzle)}
            {renderSidebarItem('products', 'Shop', ShoppingBag)}
            {renderSidebarItem('blog', 'Articles', BookOpen)}
            {renderSidebarItem('team', 'Team', Users)}
            {renderSidebarItem('songs', 'Radio', Music)}
        </nav>
        
        <div className="mt-8 space-y-3 pt-6 border-t border-gray-800">
             <button 
                onClick={handleExport}
                className="w-full bg-dana-blue text-white hover:bg-blue-600 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
                <Save size={18} /> Export Data (Save)
            </button>
            
            <button 
                onClick={handleLogout}
                className="w-full bg-gray-800 text-gray-300 hover:bg-gray-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
                <LogOut size={18} /> Exit Panel
            </button>

            <button 
                onClick={() => { if(window.confirm('Reset all changes?')) resetContent(); }}
                className="w-full text-red-500 hover:text-white py-2 text-xs flex items-center justify-center gap-1 hover:underline"
            >
                <RotateCcw size={12} /> Reset to Defaults
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">{activeTab} Manager ({editLang})</h1>
         </div>

         {/* TEXTS EDITOR */}
         {activeTab === 'texts' && (
             <div>
                 <div className="bg-white p-4 rounded-xl shadow mb-6 sticky top-0 z-10">
                     <div className="relative">
                         <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                         <input 
                            type="text" 
                            placeholder="Search text keys (e.g. hero_title, footer_desc)..." 
                            className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:border-dana-blue"
                            value={textSearch}
                            onChange={(e) => setTextSearch(e.target.value)}
                         />
                     </div>
                 </div>
                 <div className="space-y-4">
                     {Object.entries(currentData.translations)
                        .filter(([key, val]) => key.toLowerCase().includes(textSearch.toLowerCase()) || (val as string).toLowerCase().includes(textSearch.toLowerCase()))
                        .map(([key, value]) => (
                         <div key={key} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                             <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{key}</label>
                             <textarea 
                                className="w-full border rounded-lg p-2 text-gray-800 focus:border-dana-purple outline-none bg-gray-50"
                                value={value as string}
                                onChange={(e) => handleUpdateText(key, e.target.value)}
                                rows={(value as string).length > 50 ? 3 : 1}
                             />
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* GAMES EDITOR */}
         {activeTab === 'games' && (
             <div>
                 <div className="bg-blue-50 p-4 rounded-xl text-blue-800 mb-6 text-sm">
                     To add a new game, a developer must create the game component logic first. Here you can edit the titles and descriptions of existing games.
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {currentData.games.map((game, index) => (
                         <div key={game.id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                             <div className="flex items-center gap-3 mb-4">
                                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${game.color}`}>
                                    {game.id[0].toUpperCase()}
                                 </div>
                                 <span className="font-bold text-gray-400 text-xs uppercase">{game.id}</span>
                             </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400">Title</label>
                                <input 
                                    className="border rounded p-2 w-full text-sm font-bold mb-2" 
                                    value={game.title} 
                                    onChange={(e) => handleUpdateItem('games', index, 'title', e.target.value)}
                                />
                                <label className="text-xs font-bold text-gray-400">Description</label>
                                <textarea 
                                    className="border rounded p-2 w-full text-sm" 
                                    value={game.description} 
                                    rows={2}
                                    onChange={(e) => handleUpdateItem('games', index, 'description', e.target.value)}
                                />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* VIDEOS EDITOR */}
         {activeTab === 'videos' && (
             <div>
                 <button onClick={addVideo} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Video
                 </button>
                 <div className="space-y-4">
                     {currentData.videos.map((video, index) => (
                         <div key={video.id} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex flex-col md:flex-row gap-4 items-start">
                             <div className="w-32 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                                 <img src={video.thumbnail} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                 <input 
                                    className="border rounded p-2 text-sm font-bold" 
                                    value={video.title} 
                                    onChange={(e) => handleUpdateItem('videos', index, 'title', e.target.value)}
                                 />
                                 <input 
                                    className="border rounded p-2 text-sm" 
                                    value={video.category} 
                                    placeholder="Category"
                                    onChange={(e) => handleUpdateItem('videos', index, 'category', e.target.value)}
                                 />
                                 <input 
                                    className="border rounded p-2 text-sm font-mono col-span-2" 
                                    value={video.youtubeId} 
                                    placeholder="YouTube ID"
                                    onChange={(e) => handleUpdateItem('videos', index, 'youtubeId', e.target.value)}
                                 />
                                 <textarea 
                                    className="border rounded p-2 text-sm col-span-2" 
                                    value={video.description} 
                                    rows={2}
                                    onChange={(e) => handleUpdateItem('videos', index, 'description', e.target.value)}
                                 />
                             </div>
                             <button type="button" onClick={() => handleDelete('videos', index)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg">
                                 <Trash2 size={20} />
                             </button>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* ACTIVITIES EDITOR */}
         {activeTab === 'activities' && (
             <div>
                 <button onClick={addActivity} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Activity
                 </button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {currentData.activities.map((act, index) => (
                         <div key={act.id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                             <div className="flex justify-between items-start mb-2">
                                 <img src={act.image} className="w-16 h-16 rounded object-cover bg-gray-100" />
                                 <button type="button" onClick={() => handleDelete('activities', index)} className="text-red-500"><Trash2 size={18} /></button>
                             </div>
                             <div className="space-y-2">
                                <input 
                                    className="border rounded p-2 w-full text-sm font-bold" 
                                    value={act.title} 
                                    onChange={(e) => handleUpdateItem('activities', index, 'title', e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={act.type} 
                                        placeholder="Type"
                                        onChange={(e) => handleUpdateItem('activities', index, 'type', e.target.value)}
                                    />
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={act.ageGroup} 
                                        placeholder="Age Group"
                                        onChange={(e) => handleUpdateItem('activities', index, 'ageGroup', e.target.value)}
                                    />
                                </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* PRODUCTS EDITOR */}
         {activeTab === 'products' && (
             <div>
                 <button onClick={addProduct} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Product
                 </button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {currentData.products.map((product, index) => (
                         <div key={product.id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                             <div className="flex justify-between items-start mb-2">
                                 <img src={product.image} className="w-16 h-16 rounded object-cover bg-gray-100" />
                                 <button type="button" onClick={() => handleDelete('products', index)} className="text-red-500"><Trash2 size={18} /></button>
                             </div>
                             <div className="space-y-2">
                                <input 
                                    className="border rounded p-2 w-full text-sm font-bold" 
                                    value={product.name} 
                                    onChange={(e) => handleUpdateItem('products', index, 'name', e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <input 
                                        type="number"
                                        className="border rounded p-2 w-full text-sm" 
                                        value={product.price} 
                                        onChange={(e) => handleUpdateItem('products', index, 'price', parseFloat(e.target.value))}
                                    />
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={product.category} 
                                        onChange={(e) => handleUpdateItem('products', index, 'category', e.target.value)}
                                    />
                                </div>
                                <input 
                                    className="border rounded p-2 w-full text-sm text-blue-500" 
                                    value={product.externalUrl} 
                                    placeholder="Buy Link"
                                    onChange={(e) => handleUpdateItem('products', index, 'externalUrl', e.target.value)}
                                />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* SONGS EDITOR */}
         {activeTab === 'songs' && (
             <div>
                 <button onClick={addSong} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Song
                 </button>
                 <div className="space-y-2">
                     {currentData.songs.map((song, index) => (
                         <div key={song.id} className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
                             <Music size={24} className="text-dana-purple" />
                             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input 
                                    className="border rounded p-2 w-full text-sm font-bold" 
                                    value={song.title} 
                                    onChange={(e) => handleUpdateItem('songs', index, 'title', e.target.value)}
                                />
                                <input 
                                    className="border rounded p-2 w-full text-sm" 
                                    value={song.url} 
                                    placeholder="MP3 URL"
                                    onChange={(e) => handleUpdateItem('songs', index, 'url', e.target.value)}
                                />
                                <input 
                                    className="border rounded p-2 w-full text-sm" 
                                    value={song.duration} 
                                    placeholder="Duration (e.g. 2:30)"
                                    onChange={(e) => handleUpdateItem('songs', index, 'duration', e.target.value)}
                                />
                             </div>
                             <button type="button" onClick={() => handleDelete('songs', index)} className="text-red-500"><Trash2 size={18} /></button>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* TEAM EDITOR */}
         {activeTab === 'team' && (
             <div>
                 <button onClick={addTeamMember} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Team Member
                 </button>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {currentData.team.map((member, index) => (
                         <div key={member.id || index} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                             <div className="flex justify-between items-start mb-2">
                                 <img src={member.image} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
                                 <button type="button" onClick={() => handleDelete('team', index)} className="text-red-500"><Trash2 size={18} /></button>
                             </div>
                             <div className="space-y-2">
                                <input 
                                    className="border rounded p-2 w-full text-sm font-bold" 
                                    value={member.name} 
                                    onChange={(e) => handleUpdateItem('team', index, 'name', e.target.value)}
                                />
                                <input 
                                    className="border rounded p-2 w-full text-sm text-dana-coral font-bold" 
                                    value={member.role} 
                                    onChange={(e) => handleUpdateItem('team', index, 'role', e.target.value)}
                                />
                                <textarea 
                                    className="border rounded p-2 w-full text-sm" 
                                    value={member.bio} 
                                    rows={2}
                                    onChange={(e) => handleUpdateItem('team', index, 'bio', e.target.value)}
                                />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         )}
         
         {/* BLOG EDITOR */}
         {activeTab === 'blog' && (
             <div>
                 <button onClick={addBlogPost} className="mb-6 bg-dana-green text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow hover:bg-green-600">
                     <Plus size={20} /> Add Article
                 </button>
                 <div className="space-y-6">
                     {currentData.blog.map((post, index) => (
                         <div key={post.id} className="bg-white p-6 rounded-xl shadow border border-gray-100">
                             <div className="flex justify-between mb-4">
                                <h3 className="font-bold text-gray-400 text-xs uppercase">ID: {post.id}</h3>
                                <button type="button" onClick={() => handleDelete('blog', index)} className="text-red-500"><Trash2 size={18} /></button>
                             </div>
                             <div className="space-y-4">
                                <input 
                                    className="border rounded p-2 w-full text-lg font-bold" 
                                    value={post.title} 
                                    placeholder="Article Title"
                                    onChange={(e) => handleUpdateItem('blog', index, 'title', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={post.author} 
                                        placeholder="Author"
                                        onChange={(e) => handleUpdateItem('blog', index, 'author', e.target.value)}
                                    />
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={post.date} 
                                        placeholder="Date"
                                        onChange={(e) => handleUpdateItem('blog', index, 'date', e.target.value)}
                                    />
                                </div>
                                {/* Image Input */}
                                <div className="flex items-center gap-2">
                                     <div className="relative flex-1">
                                        <input
                                            className="border rounded p-2 w-full text-sm pl-8"
                                            value={post.image}
                                            placeholder="Article Image URL"
                                            onChange={(e) => handleUpdateItem('blog', index, 'image', e.target.value)}
                                        />
                                        <Image size={16} className="absolute left-2 top-2.5 text-gray-400" />
                                     </div>
                                     <button
                                        type="button"
                                        onClick={() => handleUpdateItem('blog', index, 'image', '')}
                                        className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 p-2 rounded"
                                        title="Delete Image"
                                     >
                                        Delete Image
                                     </button>
                                </div>
                                {post.image && (
                                    <div className="w-full h-32 bg-gray-100 rounded overflow-hidden">
                                        <img src={post.image} className="w-full h-full object-cover" alt="Preview" />
                                    </div>
                                )}

                                <textarea 
                                    className="border rounded p-2 w-full text-sm h-20" 
                                    value={post.excerpt} 
                                    placeholder="Short Excerpt"
                                    onChange={(e) => handleUpdateItem('blog', index, 'excerpt', e.target.value)}
                                />
                                <textarea 
                                    className="border rounded p-2 w-full text-sm h-40 font-mono" 
                                    value={post.content} 
                                    placeholder="HTML Content"
                                    onChange={(e) => handleUpdateItem('blog', index, 'content', e.target.value)}
                                />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         )}

         {/* QUIZZES EDITOR - Deep Editing */}
         {activeTab === 'quizzes' && (
             <div>
                 {!editingQuizId ? (
                     // QUIZ LIST
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {currentData.quizzes.map((quiz, index) => (
                             <div key={quiz.id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
                                 <div className="flex justify-between items-start mb-2">
                                     <img src={quiz.thumbnail} className="w-16 h-16 rounded object-cover bg-gray-100" />
                                     <button type="button" onClick={() => handleDelete('quizzes', index)} className="text-red-500"><Trash2 size={18} /></button>
                                 </div>
                                 <div className="space-y-2 mb-4">
                                    <input 
                                        className="border rounded p-2 w-full text-sm font-bold" 
                                        value={quiz.title} 
                                        onChange={(e) => handleUpdateItem('quizzes', index, 'title', e.target.value)}
                                    />
                                    <input 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={quiz.category} 
                                        onChange={(e) => handleUpdateItem('quizzes', index, 'category', e.target.value)}
                                    />
                                    <textarea 
                                        className="border rounded p-2 w-full text-sm" 
                                        value={quiz.description} 
                                        rows={2}
                                        onChange={(e) => handleUpdateItem('quizzes', index, 'description', e.target.value)}
                                    />
                                 </div>
                                 <button 
                                    onClick={() => setEditingQuizId(quiz.id)}
                                    className="w-full bg-dana-purple text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-purple-600"
                                 >
                                    <Edit3 size={16} /> Edit Questions ({quiz.questions.length})
                                 </button>
                             </div>
                         ))}
                     </div>
                 ) : (
                    // QUESTIONS EDITOR
                    <div className="bg-white p-6 rounded-3xl shadow-lg">
                        <div className="flex items-center gap-4 mb-6 border-b pb-4">
                            <button onClick={() => setEditingQuizId(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <ArrowLeft size={24} className="text-gray-600" />
                            </button>
                            <h2 className="text-2xl font-bold text-dana-purple">
                                Editing: {getCurrentQuiz()?.title}
                            </h2>
                        </div>

                        <div className="space-y-8">
                            {getCurrentQuiz()?.questions.map((q, qIndex) => (
                                <div key={q.id || qIndex} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative group">
                                    <button 
                                        onClick={() => handleDeleteQuestion(qIndex)}
                                        className="absolute top-4 right-4 text-gray-300 hover:text-red-500"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    
                                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Question {qIndex + 1}</label>
                                    <input 
                                        className="w-full border-2 border-gray-200 rounded-xl p-3 font-bold text-gray-800 mb-4 focus:border-dana-blue outline-none"
                                        value={q.text}
                                        onChange={(e) => handleUpdateQuestionText(qIndex, e.target.value)}
                                        placeholder="Enter question text..."
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {q.options.map((opt, oIndex) => (
                                            <div key={oIndex} className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => handleUpdateCorrectIndex(qIndex, oIndex)}
                                                    className={`p-2 rounded-full ${q.correctIndex === oIndex ? 'text-green-500 bg-green-100' : 'text-gray-300 hover:bg-gray-200'}`}
                                                    title="Mark as correct answer"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                                <input 
                                                    className={`w-full border rounded-lg p-2 text-sm ${q.correctIndex === oIndex ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                                                    value={opt}
                                                    onChange={(e) => handleUpdateOption(qIndex, oIndex, e.target.value)}
                                                    placeholder={`Option ${oIndex + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={handleAddQuestion}
                            className="mt-8 w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 font-bold hover:border-dana-purple hover:text-dana-purple hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={24} /> Add New Question
                        </button>
                    </div>
                 )}
             </div>
         )}

      </div>
    </div>
  );
};

export default AdminPanel;