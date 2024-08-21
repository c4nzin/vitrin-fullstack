"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async create(object) {
        return this.model.create(object);
    }
    find(query) {
        return this.model.find(query);
    }
    findById(id) {
        return this.model.findById(id);
    }
    findByIdAndDelete(id) {
        return this.model.findByIdAndDelete(id);
    }
    findByIdAndUpdate(id, update) {
        return this.model.findByIdAndUpdate(id, update, { new: true });
    }
    findOne(filter) {
        return this.model.findOne(filter);
    }
    findOneAndDelete(filter) {
        return this.model.findOneAndDelete(filter);
    }
    findOneAndUpdate(filter, update) {
        return this.model.findOneAndUpdate(filter, update, {
            new: true,
            setDefaultsOnInsert: true,
        });
    }
    updateMany(filter, object) {
        return this.model.updateMany(filter, object, { new: true });
    }
    updateOne(query, object) {
        return this.model.updateOne(query, object);
    }
    deleteMany(filter) {
        return this.model.deleteMany(filter);
    }
    deleteOne(filter) {
        return this.model.deleteOne(filter);
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map