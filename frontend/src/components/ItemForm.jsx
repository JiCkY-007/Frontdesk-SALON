import { useState } from 'react';

export default function ItemForm({ currentItem, onSave, onCancel }) {
  const [item, setItem] = useState(currentItem || { name: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item);
    setItem({ name: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {currentItem ? 'Edit Item' : 'Add Item'}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          placeholder="Item description"
          value={item.description}
          onChange={(e) => setItem({ ...item, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {currentItem ? 'Update' : 'Add'}
        </button>
        {currentItem && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}