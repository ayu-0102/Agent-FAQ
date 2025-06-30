const Database = require('better-sqlite3');
const path = require('path');

// Create or connect to SQLite database
const db = new Database(path.join(__dirname, '..', 'faq-bot.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guildId TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    embedding TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS unknown_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guildId TEXT NOT NULL,
    text TEXT NOT NULL,
    count INTEGER DEFAULT 1,
    embedding TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// FAQ operations
const faqOperations = {
  findByGuildId: (guildId) => {
    const stmt = db.prepare('SELECT * FROM faqs WHERE guildId = ? ORDER BY createdAt DESC');
    return stmt.all(guildId).map(row => ({
      ...row,
      embedding: JSON.parse(row.embedding),
      _id: row.id
    }));
  },

  findAll: () => {
    const stmt = db.prepare('SELECT * FROM faqs ORDER BY createdAt DESC');
    return stmt.all().map(row => ({
      ...row,
      embedding: JSON.parse(row.embedding),
      _id: row.id
    }));
  },

  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO faqs (guildId, question, answer, embedding, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.guildId,
      data.question,
      data.answer,
      JSON.stringify(data.embedding),
      new Date().toISOString()
    );
    return { ...data, _id: result.lastInsertRowid, id: result.lastInsertRowid };
  },

  findByIdAndUpdate: (id, data) => {
    const stmt = db.prepare(`
      UPDATE faqs 
      SET question = ?, answer = ?, embedding = ?, updatedAt = ?
      WHERE id = ?
    `);
    const result = stmt.run(
      data.question,
      data.answer,
      JSON.stringify(data.embedding),
      new Date().toISOString(),
      id
    );
    
    if (result.changes === 0) return null;
    
    const selectStmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
    const row = selectStmt.get(id);
    return row ? { ...row, embedding: JSON.parse(row.embedding), _id: row.id } : null;
  },

  findByIdAndDelete: (id) => {
    const selectStmt = db.prepare('SELECT * FROM faqs WHERE id = ?');
    const row = selectStmt.get(id);
    
    if (!row) return null;
    
    const deleteStmt = db.prepare('DELETE FROM faqs WHERE id = ?');
    deleteStmt.run(id);
    
    return { ...row, embedding: JSON.parse(row.embedding), _id: row.id };
  },

  countDocuments: () => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM faqs');
    return stmt.get().count;
  }
};

// Unknown Questions operations
const unknownQuestionOperations = {
  findOne: (query) => {
    const stmt = db.prepare('SELECT * FROM unknown_questions WHERE guildId = ? AND text = ?');
    const row = stmt.get(query.guildId, query.text);
    return row ? { ...row, embedding: JSON.parse(row.embedding), _id: row.id } : null;
  },

  findAll: () => {
    const stmt = db.prepare('SELECT * FROM unknown_questions ORDER BY count DESC, createdAt DESC');
    return stmt.all().map(row => ({
      ...row,
      embedding: JSON.parse(row.embedding),
      _id: row.id
    }));
  },

  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO unknown_questions (guildId, text, count, embedding, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.guildId,
      data.text,
      data.count,
      JSON.stringify(data.embedding),
      new Date().toISOString()
    );
    return { ...data, _id: result.lastInsertRowid, id: result.lastInsertRowid };
  },

  findById: (id) => {
    const stmt = db.prepare('SELECT * FROM unknown_questions WHERE id = ?');
    const row = stmt.get(id);
    return row ? { ...row, embedding: JSON.parse(row.embedding), _id: row.id } : null;
  },

  findByIdAndDelete: (id) => {
    const selectStmt = db.prepare('SELECT * FROM unknown_questions WHERE id = ?');
    const row = selectStmt.get(id);
    
    if (!row) return null;
    
    const deleteStmt = db.prepare('DELETE FROM unknown_questions WHERE id = ?');
    deleteStmt.run(id);
    
    return { ...row, embedding: JSON.parse(row.embedding), _id: row.id };
  },

  deleteOne: (query) => {
    const stmt = db.prepare('DELETE FROM unknown_questions WHERE id = ?');
    return stmt.run(query._id);
  },

  countDocuments: () => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM unknown_questions');
    return stmt.get().count;
  },

  updateById: (id, data) => {
    const stmt = db.prepare('UPDATE unknown_questions SET count = ? WHERE id = ?');
    stmt.run(data.count, id);
    return this.findById(id);
  }
};

module.exports = {
  db,
  Faq: faqOperations,
  UnknownQuestion: unknownQuestionOperations
};