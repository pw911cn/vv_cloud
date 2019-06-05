/**
 * @authors 12687185@qq.com
 * @date    2019/2/13/0013 15:50:35
 */
'use strict';

define(["jquery", "v", "sortable"], function ($, v, Sortable) {
	// constructor
	function customModules($resource, $target) {
		this.$target = $target;
		// init
		Sortable.create($target[0], {
			group: {
				name: "target",
				pull: ["resource"],
				put: ["resource"]
			},
			chosenClass: "customModulesChosenClass",
			animation: 250,
			easing: "cubic-bezier(1, 0, 0, 1)",// Event when you move an item in the list or between lists
		})
		Sortable.create($resource[0], {
			// el:$resource[0],
			group: {
				name: "resource",
				pull: ["target"],
				put: ["target"]
			},
			chosenClass: "customModulesChosenClass",
			animation: 250,
			sort: false,
			easing: "cubic-bezier(1, 0, 0, 1)",
		})
		// 将已经排序得元素移动到目标容器内
		var targetArr = [];
		$resource.children().each(function () {
			var $this = $(this);
			var json = v.stringToJson($this.attr("data-module"));
			$this.addClass(json.class_name);
			if (v.isNumber(json.order)) {
				targetArr.push($this);
			}
		})
		//
		targetArr.sort(function (a, b) {
			var aOrder = v.stringToJson(a.attr("data-module")).order;
			var bOrder = v.stringToJson(b.attr("data-module")).order;
			return aOrder - bOrder;
		})
		//
		targetArr.forEach(function (item) {
			item.appendTo($target);
		})
	}

	// get result
	customModules.prototype.result = function () {
		var resultArr = [];
		this.$target.children().each(function (i) {
			var itemData = $(this).attr("data-module");
			if (itemData) {
				var json = v.stringToJson(itemData);
				json.order = i;
				resultArr.push(json);
			}
		});
		return resultArr;
	}

	// module
	function module($resource, $target) {
		return new customModules($resource, $target);
	}

	return module;
})
