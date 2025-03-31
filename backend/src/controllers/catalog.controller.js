const { Catalog } = require("../models");

exports.getAllCatalogs = async (req, res) => {
  try {
    const catalogs = await Catalog.findAll();
    res.json(catalogs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener items", error });
  }
};

exports.getCatalogById = async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) return res.status(404).json({ message: "item no encontrado" });
    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el item", error });
  }
};

exports.createCatalog = async (req, res) => {
  try {
    const newCatalog = await Catalog.create(req.body);
    res.status(201).json(newCatalog);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el item", error });
  }
};

exports.updateCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) return res.status(404).json({ message: "Item no encontrado" });

    await catalog.update(req.body);
    res.json(catalog);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el item", error });
  }
};

exports.deleteCatalog = async (req, res) => {
  try {
    const catalog = await Catalog.findByPk(req.params.id);
    if (!catalog) return res.status(404).json({ message: "item no encontrado" });

    await catalog.destroy();
    res.json({ message: "Item eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el item", error });
  }
};