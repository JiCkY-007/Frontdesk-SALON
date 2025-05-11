export default function ItemList({ items, onEdit, onDelete }) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Items</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">No items yet</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item._id} className="p-4 border rounded-lg">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }