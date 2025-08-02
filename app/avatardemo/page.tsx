'use client';
import React, { useState } from 'react';
import Avatar from '../../src/components/Avatar/Avatar';
import AvatarTooltip from '../../src/components/Avatar/AvatarTooltip';

export default function AvatarDemoPage() {
  const [editableAvatarSrc, setEditableAvatarSrc] = useState<string | undefined>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleImageChange = (file: File, previewUrl: string) => {
    console.log('New image selected:', file.name);
    setUploadedFiles(prev => [...prev, file.name]);
  };

  const handleEditableAvatarChange = (file: File, previewUrl: string) => {
    setEditableAvatarSrc(previewUrl);
    console.log('Avatar image changed:', file.name);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Avatar Demo
          </h1>
          <p className="text-gray-600">
            Profile avatars with images, initials, tooltips, file upload, and custom stroke borders
          </p>
        </div>

        {/* Editable Avatars - NEW FEATURE */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🆕 Editable Avatars</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Click to Change Image</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Avatar 
                    src={editableAvatarSrc}
                    alt="Editable User"
                    variant="image"
                    editable={true}
                    onImageChange={handleEditableAvatarChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">Editable Image</p>
                </div>
                
                <div className="text-center">
                  <Avatar 
                    initials="CU"
                    variant="initials"
                    editable={true}
                    onImageChange={handleImageChange}
                  />
                  <p className="text-xs text-gray-500 mt-2">Add Photo</p>
                </div>

                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Non-editable"
                    variant="image"
                    editable={false}
                  />
                  <p className="text-xs text-gray-500 mt-2">Non-editable</p>
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">Recent Uploads:</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  {uploadedFiles.map((fileName, index) => (
                    <li key={index}>• {fileName}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 mb-2">💡 How it works:</h4>
              <ul className="text-xs text-yellow-700 space-y-1">
                <li>• Hover over editable avatars to see the "Change" or "Add Photo" overlay</li>
                <li>• Click to open the file picker</li>
                <li>• Supports common image formats (JPG, PNG, WebP, etc.)</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Files are validated before upload</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stroke Avatars - NEW FEATURE */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">🎨 Stroke Avatars</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Image Avatars with Custom Strokes</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Blue Stroke"
                    variant="image"
                    stroke={true}
                    strokeWidth={3}
                    strokeColor="#3b82f6"
                  />
                  <p className="text-xs text-gray-500 mt-2">Blue Stroke (3px)</p>
                </div>
                
                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Green Stroke"
                    variant="image"
                    stroke={true}
                    strokeWidth={2}
                    strokeColor="#10b981"
                  />
                  <p className="text-xs text-gray-500 mt-2">Green Stroke (2px)</p>
                </div>

                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
                    alt="Purple Stroke"
                    variant="image"
                    stroke={true}
                    strokeWidth={4}
                    strokeColor="#8b5cf6"
                  />
                  <p className="text-xs text-gray-500 mt-2">Purple Stroke (4px)</p>
                </div>

                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="No Stroke"
                    variant="image"
                    stroke={false}
                  />
                  <p className="text-xs text-gray-500 mt-2">No Stroke</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Initial Avatars with Custom Strokes</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Avatar 
                    initials="AS"
                    variant="initials"
                    stroke={true}
                    strokeWidth={2}
                    strokeColor="#ef4444"
                  />
                  <p className="text-xs text-gray-500 mt-2">Red Stroke (2px)</p>
                </div>
                
                <div className="text-center">
                  <Avatar 
                    initials="JD"
                    variant="initials"
                    stroke={true}
                    strokeWidth={3}
                    strokeColor="#f59e0b"
                  />
                  <p className="text-xs text-gray-500 mt-2">Orange Stroke (3px)</p>
                </div>

                <div className="text-center">
                  <Avatar 
                    initials="JS"
                    variant="initials"
                    stroke={true}
                    strokeWidth={5}
                    strokeColor="#06b6d4"
                  />
                  <p className="text-xs text-gray-500 mt-2">Cyan Stroke (5px)</p>
                </div>

                <div className="text-center">
                  <Avatar 
                    initials="MJ"
                    variant="initials"
                    stroke={false}
                  />
                  <p className="text-xs text-gray-500 mt-2">No Stroke</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Editable Avatars with Strokes</h3>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Editable with Stroke"
                    variant="image"
                    editable={true}
                    onImageChange={handleImageChange}
                    stroke={true}
                    strokeWidth={3}
                    strokeColor="#dc2626"
                  />
                  <p className="text-xs text-gray-500 mt-2">Editable + Red Stroke</p>
                </div>
                
                <div className="text-center">
                  <Avatar 
                    initials="EU"
                    variant="initials"
                    editable={true}
                    onImageChange={handleImageChange}
                    stroke={true}
                    strokeWidth={2}
                    strokeColor="#059669"
                  />
                  <p className="text-xs text-gray-500 mt-2">Editable + Green Stroke</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">🎨 Stroke Options:</h4>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>stroke</strong>: boolean - Enable/disable stroke border</li>
                <li>• <strong>strokeWidth</strong>: number - Width in pixels (default: 2)</li>
                <li>• <strong>strokeColor</strong>: string - Any valid CSS color (default: "#3b82f6")</li>
                <li>• When stroke is enabled, the default gray border is removed</li>
                <li>• Supports hex colors, rgb(), rgba(), CSS color names, and more</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Basic Avatars */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Avatars</h2>
          
          <div className="space-y-8">
            {/* Image Avatars */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Image Avatars</h3>
              <div className="flex items-center space-x-4">
                <Avatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="John Doe"
                  variant="image"
                />
                <Avatar 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jane Smith"
                  variant="image"
                />
                <Avatar 
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
                  alt="Mike Johnson"
                  variant="image"
                />
              </div>
            </div>

            {/* Initial Avatars */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Initial Avatars</h3>
              <div className="flex items-center space-x-4">
                <Avatar 
                  initials="AS"
                  variant="initials"
                />
                <Avatar 
                  initials="JD"
                  variant="initials"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Tooltips */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Avatar Tooltips</h2>
          
          <div className="space-y-8">
            {/* Image Tooltip Avatars */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">With Image Tooltips (Hover to see)</h3>
              <div className="flex items-center space-x-4">
                <AvatarTooltip 
                  variant="image"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="John Doe"
                />
                <AvatarTooltip 
                  variant="image"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jane Smith"
                />
                <AvatarTooltip 
                  variant="image"
                  src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
                  alt="Mike Johnson"
                />
              </div>
            </div>

            {/* Initial Tooltip Avatars */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">With Initial Tooltips (Hover to see)</h3>
              <div className="flex items-center space-x-4">
                <AvatarTooltip 
                  variant="initials"
                  initials="AS"
                  alt="Armond Schneider"
                />
                <AvatarTooltip 
                  variant="initials"
                  initials="JD"
                  alt="John Doe"
                />
                <AvatarTooltip 
                  variant="initials"
                  initials="JS"
                  alt="Jane Smith"
                />
                <AvatarTooltip 
                  variant="initials"
                  initials="MJ"
                  alt="Mike Johnson"
                />
              </div>
            </div>

            {/* Stroke Tooltip Avatars */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">With Stroke Tooltips (Hover to see)</h3>
              <div className="flex items-center space-x-4">
                <AvatarTooltip 
                  variant="image"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="John Doe"
                  stroke={true}
                  strokeWidth={3}
                  strokeColor="#3b82f6"
                />
                <AvatarTooltip 
                  variant="initials"
                  initials="AS"
                  alt="Armond Schneider"
                  stroke={true}
                  strokeWidth={2}
                  strokeColor="#ef4444"
                />
                <AvatarTooltip 
                  variant="initials"
                  initials="JS"
                  alt="Jane Smith"
                  stroke={true}
                  strokeWidth={4}
                  strokeColor="#10b981"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Usage Examples</h2>
          
          <div className="space-y-6">
            {/* Team List Example */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Team Members</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    variant="image"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">Frontend Developer</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Jane Smith"
                    variant="image"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                    <p className="text-xs text-gray-500">UI/UX Designer</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar 
                    initials="AS"
                    variant="initials"
                    editable={true}
                    onImageChange={handleImageChange}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Armond Schneider</p>
                    <p className="text-xs text-gray-500">Product Manager (Click avatar to add photo)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Avatar Stack Example */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Avatar Stack</h3>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Avatar 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    variant="image"
                  />
                  <Avatar 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Jane Smith"
                    variant="image"
                  />
                  <Avatar 
                    initials="AS"
                    variant="initials"
                  />
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs cursor-pointer border-2 border-white">
                    +3
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-600">6 team members</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Hover over tooltip avatars to see the interactive effects
          </p>
        </div>
      </div>
    </div>
  );
}
