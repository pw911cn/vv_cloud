/**
 * @authors 12687185@qq.com
 * @date    2017/6/15/0015 14:45:48
 */
'use strict';
define(["jquery"], function ($) {
	function init() {
		if ($.fn.fuzzySearch)
			return;
		$.fn.fuzzySearch = function (ops) {
			var $input = $(this);
			var $wrap = $input.parent("div");
			if ($input.length !== 1) {
				throw new Error("模糊搜索初始化input不唯一");
			}
			$input.addClass("inputWrapInput");
			// 搜索结果请求地址
			var url = ops.url;
			// 点击结果列表item后的回调方法
			var active = ops.active;
			// 结果列表渲染方法
			var render = ops.render;
			// input值改变以后回调
			var inputChange = ops.inputChange;
			// 是否严格匹配
			var matching = ops.matching || false;
			// 无输入值状态下是否发送搜索请求
			var emptyKeywords = ops.emptyKeywords || false;
			//发送请求的key;
			var key=ops.key
			// 分页
			var pageData = {};
			var paginationData = ops.pagination || false;
			if (paginationData) {
				// 如果有分页,就初始化这些变量
				var pageNumber = paginationData.pageNumber || 1;
				var pageSize = paginationData.pageSize;
				pageData.pageNumber = pageNumber;
			}
			pageData.pageSize = pageSize || 10;
			//
			var currentKey, ajaxKey, inputTimeoutId,
				resultData = [];
			// 被选择的结果样式
			var activedItemClass = "tms-fuzzySearch-active";
			//创建html后,才可以初始化各个jquery对象
			createDom();
			// 搜索结果标题
			var $resultTitle = $wrap.find(".queryTip");
			// 搜索结果列表ul
			var $ul = $wrap.find("ul");
			// 搜索结果容器
			var $resultWrap = $wrap.find(".queryWrap");
			// 分页容器
			var $pagiWrap = $wrap.find(".queryPagination");
			var $nextBtn = $pagiWrap.find(".queryNextBtn");
			var $prevBtn = $pagiWrap.find(".queryPrevBtn");
			var $pagiInfo = $pagiWrap.find(".queryPagenum");
			// 控制分页显示
			if (!paginationData) {
				$pagiWrap.hide();
			}

			// 请求需要发送的额外数据
			function customerData() {
				var customerData = {};
				if (typeof(ops.data) === "function") {
					customerData = ops.data();
				} else if (isJson(ops.data)) {
					customerData = ops.data;
				} else {
					throw new Error("data参数必须是json或者Function");
				}
				return customerData;
			}

			// 创建html
			function createDom() {
				$input.attr({
					spellcheck: "false",
					autocapitalize: "off",
					autocomplete: "off"
				});
				var inputWrap = '<div class="inputWrap"></div>';
				var $appendHtml = $('<div class="queryWrap">' +
					'<div class="queryTip">搜索结果如下：</div>' +
					'<div class="queryBlock"><ul></ul></div>' +
					'<div class="queryPagination">' +
					'<div class="queryPagenum"></div>' +
					'<button class="queryPrevBtn" type="button" title="上一页"><</button>' +
					'<button class="queryNextBtn" type="button" title="下一页">></button>' +
					'</div>' +
					'</div>' +
					'</div>');
				$input.wrap(inputWrap);
				// input里添加一个图标
				var $icon = $('<i class="tms3-sousuo"></i>');
				$input.after($icon);
				$appendHtml.appendTo($wrap);
			}

			// 绑定事件
			inputBindEvent();

			// 绑定事件
			function inputBindEvent() {
				$input.on("click", inputClickHandler)
					.on("input", inputInputHandler)
					.on("search", inputInputHandler)
					.on("keyup", inputKeyupHandler)
			}

			// click handler
			function inputClickHandler(e) {
				var val = $input.val();
				if (val !== "") {
					// input内有搜索关键字
						pageData.pageNumber = 1;
						ajax();
						$resultWrap.show();

				} else {
					// input内为空
					if (emptyKeywords) {
						// $resultTitle.html("默认结果:");
						pageData.pageNumber = 1;
						ajax();
						$resultWrap.show();
					}
				}
			}

			// input handler
			function inputInputHandler(e) {
				if (inputTimeoutId !== void 0)
					clearTimeout(inputTimeoutId);
				// 延迟发送请求
				inputTimeoutId = setTimeout(function () {
					currentKey = void 0;
					var val = $input.val();
					if (val !== "") {
						pageData.pageNumber = 1;
						// 发送搜索请求
						ajax();
						ajaxKey = val;
						$resultWrap.show();
					} else {
						// input内为空
						if (emptyKeywords) {
							pageData.pageNumber = 1;
							ajax();
							ajaxKey = val;
							$resultWrap.show();
						} else {
							$resultWrap.hide();
						}
					}
				}, 250);
				if (typeof(inputChange) === "function") {
					inputChange($input.val(), $input);
				}
			}

			// keyup handler
			function inputKeyupHandler(e) {
				if ($resultWrap.is(":visible")) {
					var keyCode = e.keyCode;
					var $lis = $ul.find("li");
					var liLength = $lis.length;
					var cIndex = $lis.filter("." + activedItemClass).index();
					switch (keyCode) {
						case 38:
							// console.log("上 keyupHandler");
							cIndex = --cIndex < 0 ? liLength - 1 : cIndex;
							$lis.eq(cIndex).addClass(activedItemClass).siblings().removeClass(activedItemClass);
							currentKey = resultData[cIndex];
							_active(currentKey);
							break;
						case 40:
							// console.log("下 keyupHandler");
							cIndex = ++cIndex > liLength - 1 ? 0 : cIndex;
							$lis.eq(cIndex).addClass(activedItemClass).siblings().removeClass(activedItemClass);
							currentKey = resultData[cIndex];
							_active(currentKey);
							break;
						case 13:
						case 27:
							// console.log("esc 回车 keyupHandler");
							$resultWrap.hide();
							matchingHandler();
							break;
					}
				}
			}

			// 发送搜索请求
			function ajax() {
				var val = $input.val();
				var updata={param:{}}
				ajaxKey = val;
				// 发送的数据
				updata.param[key]=val;
				updata.pageVo=pageData;
				var ajaxData = $.extend(true,{}, customerData(),updata);
				$.ajax({
					url: url,
					data: JSON.stringify(ajaxData),
					success: function (data) {
						//返回数据
						if (data !== void 0) {
							if (isJson(data)) {
								resultData = data.datas.datas;
								pageData.pageNumber = data.datas.pageNumber;
								pageData.pageSize = data.datas.pageSize;
								pageData.total = data.datas.total;
							} else if (isArray(data)) {
								resultData = data;
							}
							createResultList();
							setPagination(pageData);
						} else {
							throw new Error("搜索返回结果错误!,当前返回结果= " + data);
						}
					}
				})
			}

			// 创建搜索结果列表
			function createResultList() {
				$ul.children().remove();
				var $items = $();
				if (resultData.length !== 0) {
					var val = $input.val();
					if (val !== "") {
						$resultTitle.html("按<span class='light'>" + val + "</span>搜索:");
					} else {
						$resultTitle.html(emptyKeywords.title || "按汉字或↑↓检索:");
					}
					// 有搜索结果
					resultData.forEach(function (v, i) {
						var $li = $("<li></li>");
						if (isJson(v)) {
							if (typeof(render) !== "function") {
								throw new Error("返回列表数据为json数组,此时render参数必须是Function!");
							}
							render(v, $li);
						} else if (typeof (v) === "string") {
							// 返回类型是字符串数组
							$li.html(v);
						}
						$li.on("click", function (e) {
							e.stopPropagation
							currentKey = resultData[i];
							_active(currentKey);
							$input.focus();
						});
						$items = $items.add($li);
					})
				} else {
					// 搜索结果为空
					var temp = $input.val();
					if (temp !== "") {
						$resultTitle.html("无法匹配<span class='light'>" + temp + "</span>");
					} else {
						$resultTitle.html("无默认搜索结果");
					}
				}
				$items.appendTo($ul);
			}

			// 隐藏
			function windowClickHandler(e) {
				var visibleEnable = $resultWrap.is(":visible");
				var target = $(e.target)[0];
				var targetEnable = target !== $input[0] && target !== $nextBtn[0] && target !== $prevBtn[0];
				if (visibleEnable && targetEnable) {
					$resultWrap.hide();
					matchingHandler(true);
				}
			}

			$(window).on("click", windowClickHandler);

			// 匹配搜索结果
			function matchingHandler(w) {
				if (currentKey === void 0) {
					var tempVal = $input.val();
					if (tempVal !== "") {
						resultData.forEach(function (v) {
							if (isJson(v)) {
								for (var item in v) {
									if (item === tempVal)
										currentKey = item;
								}
							} else {
								if (tempVal === v)
									currentKey = v;
							}
						});
						if (currentKey !== void 0)
							_active(currentKey);
						else {
							pageData.pageNumber = 1;
						}
					}
					if (currentKey === void 0) {
						if (matching) {
							_active("");
							$input.val("");
						} else {
							_active($input.val());
						}
					}
				} else {
					if(currentKey&&$input.val()==""&&w){
						_active("");
						return;
					}
					_active(currentKey);
				}
			}

			// 回调用户已经选定搜索结果
			function _active(val) {
				var item = val || "";
				if (typeof(active) === "function") {
					active(item, $input, resultData);
				} else {
					if (typeof(item) === "string") {
						$input.val(item);
					}
				}
				// 如果调用之后input还是空,则自动把字符串数组值回填到input
				if ($input.val() === "") {
					if (typeof(item) === "string") {
						$input.val(item);
					}
				}
			}

			// 判断json
			function isJson(data) {
				return typeof(data) === "object" && Object.prototype.toString.call(data).toLowerCase() === "[object object]" && !data.length
			}

			// 判断数组
			var isArray = Array.isArray || function (obj) {
				return obj !== void 0 && toString.call(obj) === '[object Array]';
			};

			// pageNumber,pageSize,total
			function setPagination(data) {
				// 有分页
				if (paginationData) {
					$pagiWrap.show();
					var total = data.total;
					var pageNumber = data.pageNumber;
					var pageSize = data.pageSize;
					var pageTotal = Math.ceil(total / pageSize);
					if (pageNumber <= 1) {
						$prevBtn.attr("disabled", true);
						$prevBtn.fadeTo("fast", 0.3);
					} else {
						$prevBtn.attr("disabled", false);
						$prevBtn.fadeTo("fast", 1);
					}
					if (pageNumber === pageTotal) {
						$nextBtn.attr("disabled", true);
						$nextBtn.fadeTo("fast", 0.3);
					} else {
						$nextBtn.attr("disabled", false);
						$nextBtn.fadeTo("fast", 1);
					}
					if (total && pageNumber && pageSize) {
						pageData = {pageSize: pageSize, pageNumber: pageNumber};
						$prevBtn.off("click").on("click", function () {
							pageData.pageNumber = pageNumber === 1 ? 1 : --pageNumber;
							ajax();
						});
						$nextBtn.off("click").on("click", function () {
							pageData.pageNumber = pageNumber === pageTotal ? pageTotal : ++pageNumber;
							ajax();
						});
					} else {
						$pagiWrap.hide();
						// console.warn("分页被隐藏;\n模糊搜索初始化时有分页,但是ajax返回数据无分页数据;");
					}
					$pagiInfo.html('<span class="current">' + pageNumber + '</span>/' + pageTotal + '页');
				}
			}
		}
	}

	init();
})

