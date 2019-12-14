"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_datasource_rest_1 = require("apollo-datasource-rest");
var precipitationEnum_1 = require("../enums/precipitationEnum");
var SmhiApi = (function (_super) {
    __extends(SmhiApi, _super);
    function SmhiApi() {
        var _this = _super.call(this) || this;
        _this.baseURL =
            'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/';
        return _this;
    }
    SmhiApi.prototype.getForecast = function (longitude, latitude, hour) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.get("lon/" + longitude + "/lat/" + latitude + "/data.json")];
                    case 1:
                        response = (_a.sent());
                        return [2, this.forecastReducer(response, hour)];
                }
            });
        });
    };
    SmhiApi.prototype.getAllForecasts = function (longitude, latitude) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.get("lon/" + longitude + "/lat/" + latitude + "/data.json")];
                    case 1:
                        response = (_a.sent());
                        return [2, this.allForecastsReducer(response)];
                }
            });
        });
    };
    SmhiApi.prototype.allForecastsReducer = function (foreCasts) {
        var result = [];
        foreCasts.timeSeries.map(function (t) {
            var temperature = t.parameters.find(function (p) { return p.name === 't' && p.unit === 'Cel'; }).values[0];
            var windSpeed = t.parameters.find(function (p) { return p.name === 'ws' && p.unit === 'm/s'; }).values[0];
            var precipitationCategory = t.parameters.find(function (p) { return p.name === 'pcat'; })
                .values[0];
            result.push({
                longitude: foreCasts.geometry.coordinates[0][0],
                latitude: foreCasts.geometry.coordinates[0][1],
                temperature: temperature,
                windSpeed: windSpeed,
                time: t.validTime,
                precipitationCategory: precipitationEnum_1.PrecipitationCategory[parseInt(precipitationCategory)]
            });
        });
        return result;
    };
    SmhiApi.prototype.forecastReducer = function (foreCast, hour) {
        var timeSeries = foreCast.timeSeries.find(function (t) {
            var validTime = new Date(t.validTime);
            return validTime.getHours() === parseInt(hour);
        });
        var temperature = this.getNamedParameter(timeSeries, 't', 'Cel');
        var windSpeed = this.getNamedParameter(timeSeries, 'ws', 'm/s');
        var precipitationCategory = this.getNamedParameter(timeSeries, 'pcat');
        return {
            longitude: foreCast.geometry.coordinates[0][0],
            latitude: foreCast.geometry.coordinates[0][1],
            temperature: temperature,
            windSpeed: windSpeed,
            time: timeSeries.validTime,
            precipitationCategory: precipitationEnum_1.PrecipitationCategory[parseInt(precipitationCategory)]
        };
    };
    SmhiApi.prototype.getNamedParameter = function (timeSeries, name, unit) {
        if (name === void 0) { name = ''; }
        if (unit === void 0) { unit = ''; }
        if (unit) {
            return timeSeries.parameters.find(function (t) { return t.name === name && t.unit === unit; })
                .values[0];
        }
        else {
            return timeSeries.parameters.find(function (t) { return t.name === name; }).values[0];
        }
    };
    return SmhiApi;
}(apollo_datasource_rest_1.RESTDataSource));
exports.SmhiApi = SmhiApi;
