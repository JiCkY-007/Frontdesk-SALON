import { useState, useEffect } from 'react';
import { fetchItems, createItem, updateItem, deleteItem } from '../services/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const { data } = await fetchItems();
      setItems(data);
    } catch (error) {
      console.error('Failed to load items:', error);
    }
  };

  const handleSave = async (itemData) => {
    try {
      if (currentItem) {
        await updateItem(currentItem._id, itemData);
      } else {
        await createItem(itemData);
      }
      loadItems();
      setCurrentItem(null);
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      loadItems();
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Item Management</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ItemForm
            currentItem={currentItem}
            onSave={handleSave}
            onCancel={() => setCurrentItem(null)}
          />
        </div>
        <div>
          <ItemList
            items={items}
            onEdit={setCurrentItem}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}