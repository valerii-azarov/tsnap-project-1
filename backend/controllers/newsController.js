import newsModel from "../models/newsModel.js";

async function getNewsHandler(req, res) {
  try {
    const { page, limit } = req.query;

    const data = await newsModel.getNewsByPage(page, limit);        
    const newsCount = await newsModel.getTotalNewsCount();
    const totalPages = Math.ceil(newsCount / limit);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Дані про новини відсутні.",
      });
    }
    
    return res.status(200).json({ totalPages, data });
  } catch (error) {
    logger.error("Помилка при отриманні новин: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні новин.",
    });
  }
}

async function getFeaturedNewsHandler(req, res) {
  try {
    const featuredNews = await newsModel.getFeaturedNews();

    if (!featuredNews || featuredNews.length === 0) {
      return res.status(404).json({ 
        message: "Важливого оголошення не знайдено." 
      });
    }

    return res.status(200).json(featuredNews);
  } catch (error) {
    logger.error("Помилка при отриманні важливого оголошення: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні важливого оголошення.",
    });
  }
}

async function getNewsByIdHandler(req, res) {
  try {
    const newsId = req.params.newsId;

    const news = await newsModel.getNewsById(newsId);

    if (!news) {
      return res.status(404).json({ 
        message: "Новина не знайдена." 
      });
    }

    return res.status(200).json(news);
  } catch (error) {
    logger.error("Помилка при отриманні новини: ", error.message);
    return res.status(500).json({
      message: "Помилка при отриманні новини.",
    });
  }
}

export { 
  getNewsHandler,
  getFeaturedNewsHandler,
  getNewsByIdHandler,
};
