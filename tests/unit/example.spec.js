"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_utils_1 = require("@vue/test-utils");
var App_vue_1 = __importDefault(require("@/App.vue"));
test("App should work", function () {
    var wrapper = test_utils_1.shallowMount(App_vue_1.default);
    expect(wrapper.text()).toMatch("Welcome to Your Vue.js + TypeScript App");
});
