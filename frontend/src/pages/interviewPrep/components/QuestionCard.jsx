import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LuPin, LuPinOff, LuBookOpen, LuPencil } from 'react-icons/lu'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const QuestionCard = ({
    question,
    answer,
    note,
    isPinned,
    onPin,
    onUpdateNote,
    onGenerateExplanation,
    isGeneratingExplanation = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isEditingNote, setIsEditingNote] = useState(false)
    const [noteValue, setNoteValue] = useState(note || '')

    // Sync noteValue when note prop changes
    useEffect(() => {
        setNoteValue(note || '')
    }, [note])

    const handleSaveNote = () => {
        onUpdateNote(noteValue)
        setIsEditingNote(false)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`bg-gray-900 border rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${isPinned ? 'border-orange-500 border-2' : 'border-gray-700'
                }`}
        >
            {/* Header with Pin and Actions */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPin}
                        className={`p-2 rounded-lg transition-colors ${isPinned
                            ? 'bg-orange-500 text-white hover:bg-orange-600'
                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-300'
                            }`}
                        title={isPinned ? 'Unpin question' : 'Pin question'}
                    >
                        {isPinned ? <LuPin size={18} /> : <LuPinOff size={18} />}
                    </button>
                    {isPinned && (
                        <span className="text-xs font-semibold text-black bg-orange-500 px-2 py-1 rounded">
                            Pinned
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={onGenerateExplanation}
                        disabled={isGeneratingExplanation}
                        className="p-2 rounded-lg bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Generate AI explanation"
                    >
                        <LuBookOpen size={18} />
                    </button>
                </div>
            </div>

            {/* Question */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">Question</h3>
                <div className="text-gray-300 leading-relaxed">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{question}</ReactMarkdown>
                </div>
            </div>

            {/* Answer - Expandable */}
            <div className="mb-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center justify-between w-full text-left mb-2"
                >
                    <h3 className="text-lg font-semibold text-white">Answer</h3>
                    <span className="text-sm text-gray-400">
                        {isExpanded ? 'Hide' : 'Show'} Answer
                    </span>
                </button>
                {isExpanded && (
                    <div className="mt-2 p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="text-gray-300 leading-relaxed prose prose-sm max-w-none prose-invert">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
                        </div>
                    </div>
                )}
            </div>

            {/* Notes Section */}
            <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                        <LuPencil size={16} />
                        Your Notes
                    </h4>
                    {!isEditingNote && (
                        <button
                            onClick={() => setIsEditingNote(true)}
                            className="text-xs text-orange-500 hover:text-orange-400"
                        >
                            {note ? 'Edit' : 'Add Note'}
                        </button>
                    )}
                </div>

                {isEditingNote ? (
                    <div className="space-y-2">
                        <textarea
                            value={noteValue}
                            onChange={(e) => setNoteValue(e.target.value)}
                            placeholder="Add your personal notes, thoughts, or reminders here..."
                            className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
                            rows={4}
                        />
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleSaveNote}
                                className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                Save Note
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditingNote(false)
                                    setNoteValue(note || '')
                                }}
                                className="px-4 py-2 bg-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-3 bg-gray-800 rounded-lg min-h-[60px]">
                        {note ? (
                            <p className="text-sm text-gray-300 whitespace-pre-wrap">{note}</p>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No notes yet. Click "Add Note" to add your thoughts.</p>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default QuestionCard

