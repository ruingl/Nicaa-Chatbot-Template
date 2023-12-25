/**
 * DO NOT EDIT THIS FILE DIRECTLY.
 * This file is generated following the conversion of 
 * @see [./FCA-TEMP/src/searchForThread.js]{@link ./FCA-TEMP/src/searchForThread.js}
 * 
 **/
import utils  from "../utils.mjs";
"use strict";



export default function (defaultFuncs, api, ctx) {
	return function searchForThread(name, callback) {
		let resolveFunc = function () { };
		let rejectFunc = function () { };
		const returnPromise = new Promise(function (resolve, reject) {
			resolveFunc = resolve;
			rejectFunc = reject;
		});

		if (!callback) {
			callback = function (err, friendList) {
				if (err) {
					return rejectFunc(err);
				}
				resolveFunc(friendList);
			};
		}

		const tmpForm = {
			client: "web_messenger",
			query: name,
			offset: 0,
			limit: 21,
			index: "fbid"
		};

		defaultFuncs
			.post(
				"https://www.facebook.com/ajax/mercury/search_threads.php",
				ctx.jar,
				tmpForm
			)
			.then(utils.parseAndCheckLogin(ctx, defaultFuncs))
			.then(function (resData) {
				if (resData.error) {
					throw resData;
				}
				if (!resData.payload.mercury_payload.threads) {
					return callback({ error: "Could not find thread `" + name + "`." });
				}
				return callback(
					null,
					resData.payload.mercury_payload.threads.map(utils.formatThread)
				);
			});

		return returnPromise;
	};
};
