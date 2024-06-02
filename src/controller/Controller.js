/**
 * @typedef {Object} ControllerOptions
 * @property {string} Path
 * @property {ExpressHandler} Get
 * @property {ExpressHandler} Post
 * @property {ExpressHandler} Put
 * @property {ExpressHandler} Delete
 * @property {ValidationChain} Schema
 * @property {ValidationChain} PutSchema
 * @property {ValidationChain} PostSchema
 */

/**
 * @class
 */
export default class Controller {
  /**
   * @param {ControllerOptions} options
   */
  constructor({ Path, Get, Post, Put, Delete, Schema, PutSchema, PostSchema }) {
    this.Path = Path;
    this.Get = Get;
    this.Post = Post;
    this.Put = Put;
    this.Delete = Delete;
    this.Schema = Schema;
    this.PutSchema = PutSchema || Schema;
    this.PostSchema = PostSchema || Schema;
  }
}
