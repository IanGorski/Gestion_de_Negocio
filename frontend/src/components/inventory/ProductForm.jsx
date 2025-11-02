import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import mockInventoryService from "../../services/mockInventory";

// props: onCreated(product)
const ProductForm = ({ onCreated }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        sku: "",
        category: "A",
        cost: "",
        price: "",
        stock: 0,
        minStock: 0,
        expiryDate: "",
    });

    const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const valid = form.name && form.sku && Number(form.price) > 0;

    const submit = async () => {
        if (!valid) return;
        const record = await mockInventoryService.create({
            name: form.name,
            description: form.description,
            sku: form.sku,
            category: form.category,
            cost: Number(form.cost || 0),
            price: Number(form.price),
            stock: Number(form.stock || 0),
            minStock: Number(form.minStock || 0),
            expiryDate: form.expiryDate || null,
        });
        onCreated && onCreated(record);
        setForm({
            name: "",
            description: "",
            sku: "",
            category: "A",
            cost: "",
            price: "",
            stock: 0,
            minStock: 0,
            expiryDate: "",
        });
    };

    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Nuevo Producto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input
                    label="Nombre"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                />
                <Input
                    label="SKU/Código"
                    value={form.sku}
                    onChange={(e) => update("sku", e.target.value)}
                />
                <div>
                    <label className="input-label">Categoría</label>
                    <select
                        className="input-field"
                        value={form.category}
                        onChange={(e) => update("category", e.target.value)}
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <Input
                    label="Descripción"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                />
                <Input
                    label="Costo"
                    type="number"
                    value={form.cost}
                    onChange={(e) => update("cost", e.target.value)}
                />
                <Input
                    label="Precio de venta"
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                />
                <Input
                    label="Stock actual"
                    type="number"
                    value={form.stock}
                    onChange={(e) => update("stock", e.target.value)}
                />
                <Input
                    label="Stock mínimo"
                    type="number"
                    value={form.minStock}
                    onChange={(e) => update("minStock", e.target.value)}
                />
                <div>
                    <label className="input-label">Fecha de vencimiento (opcional)</label>
                    <input
                        className="input-field"
                        type="date"
                        value={form.expiryDate}
                        onChange={(e) => update("expiryDate", e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-4">
                <Button
                    onClick={submit}
                    disabled={!valid}
                    className={`bg-blue-600 hover:bg-blue-700 ${!valid ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    Guardar
                </Button>
            </div>
        </div>
    );
};

export default ProductForm;
