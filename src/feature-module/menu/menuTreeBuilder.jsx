import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getMenuTree } from "../../services/menu/menuService";
import { getAllProducts } from "../../services/product/product";
import { useParams } from "react-router-dom";

const MenuTreeBuilder = () => {
    const { id } = useParams();
    const [menuData, setMenuData] = useState(null);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        const tree = await getMenuTree(id);
        const products = await getAllProducts();
        setMenuData(tree);
        setProductList(products);
    };

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        console.log(source);
        if (!destination) return;

        // For example, if you drop into a menu item:
        const menuItemId = destination.droppableId;

        const draggedProduct = productList.find(p => p.POS_ProductID.toString() === draggableId);

        if (draggedProduct && menuItemId.startsWith("menu-item-")) {
            const targetItemId = parseInt(menuItemId.replace("menu-item-", ""));
            assignProductToMenuItem(targetItemId, draggedProduct);
        }
    };

    const assignProductToMenuItem = (itemId, product) => {
        const updatedMenuData = { ...menuData };
        const updateItems = (items) => {
            return items.map((item) => {
                if (item.ItemID === itemId) {
                    if (!item.Product) item.Product = [];
                    item.Product.push(product);
                } else if (item.ChildItem?.length) {
                    item.ChildItem = updateItems(item.ChildItem);
                }
                return item;
            });
        };

        updatedMenuData.MenuItems = updateItems(updatedMenuData.MenuItems);
        setMenuData(updatedMenuData);

        // Optionally: remove product from productList
        setProductList(prev => prev.filter(p => p.POS_ProductID !== product.POS_ProductID));
    };

    const renderMenuItems = (items) => {
        return items.map((item) => (
            <Droppable droppableId={`menu-item-${item.ItemID}`} key={item.ItemID}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="menu-item"
                        style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
                    >
                        <strong>{item.Item}</strong>
                        <ul>
                            {item.Product?.map((prod) => (
                                <li key={prod.POS_ProductID}>🛍 {prod.Product}</li>
                            ))}
                        </ul>

                        {item.ChildItem?.length > 0 && renderMenuItems(item.ChildItem)}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        ));
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <h4>{menuData ? `${menuData.MenuName} Menu` : "Menu Tree"}</h4>
                    <h6>Drag products into menu items</h6>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <div className="row">
                        {/* Left: Menu Tree */}
                        <div className="col-md-6">
                            {menuData ? renderMenuItems(menuData.MenuItems) : <p>Loading menu...</p>}
                        </div>

                        {/* Right: Draggable Products */}
                        <div className="col-md-6">
                            <h5>🛒 All Products</h5>
                            <Droppable droppableId="product-list" isDropDisabled={true}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {productList.map((product, index) => (
                                            <Draggable
                                                draggableId={product.POS_ProductID.toString()}
                                                index={index}
                                                key={product.POS_ProductID}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="product-item"
                                                        style={{
                                                            border: "1px solid #ddd",
                                                            padding: "8px",
                                                            marginBottom: "5px",
                                                            background: "#f9f9f9",
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        {product.ProductName}
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
};

export default MenuTreeBuilder;
