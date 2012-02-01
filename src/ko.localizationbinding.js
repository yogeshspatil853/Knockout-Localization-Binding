﻿// See https://github.com/tfsjohan/Knockout-Localization-Binding for more details.

(function () {
    ko.bindingHandlers.restext = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var text = getLocalizedText(ko.utils.unwrapObservable(valueAccessor()));
            ko.bindingHandlers.text.update(
                element,
                function () { return text; },
                allBindingsAccessor,
                viewModel,
                context);
        }
    };

    ko.bindingHandlers.reshtml = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var text = getLocalizedText(ko.utils.unwrapObservable(valueAccessor()));
            ko.bindingHandlers.html.update(
                element,
                function () { return text; },
                allBindingsAccessor,
                viewModel,
                context);
        }
    };

    ko.bindingHandlers.reshref = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var text = getLocalizedText(ko.utils.unwrapObservable(valueAccessor()));
            ko.bindingHandlers.attr.update(
                element,
                function () { return { href: text }; },
                allBindingsAccessor,
                viewModel,
                context);
        }
    };

    ko.bindingHandlers.ressrc = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var text = getLocalizedText(ko.utils.unwrapObservable(valueAccessor()));
            ko.bindingHandlers.attr.update(
                element,
                function () { return { src: text }; },
                allBindingsAccessor,
                viewModel,
                context);
        }
    };

    ko.bindingHandlers.resattr = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
            var json = ko.utils.unwrapObservable(valueAccessor());
            for (var attr in json) {
                var text = getLocalizedText(json[attr]);
                ko.bindingHandlers.attr.update(
                    element,
                    function () { var x = {}; x[attr] = text; return x; },
                    allBindingsAccessor,
                    viewModel,
                    context);
            }
        }
    };

    function getLocalizedText(binding) {
        if (typeof resources === "undefined") {
            throw "ko.bindingHandlers.restext: resources object is not defined";
        }

        if (typeof locale === "undefined") {
            throw "ko.bindingHandlers.restext: locale object is not defined";
        }

        if (Object.prototype.toString.call(binding) === '[object String]') {
            binding = { key: binding };
        }

        var key = binding.key;
        var item = resources[key];
        if (!item) {
            throw "ko.bindingHandlers.getLocalizedText: Could not find key '" + key + "'.";
        }

        var text = item[locale] || item['default'] || "";

        if (binding.params) {
            for (var replaceKey in binding.params) {
                var replacement = binding.params[replaceKey];
                if (typeof replacement === "function") {
                    replacement = ko.utils.unwrapObservable(replacement());
                }
                text = text.replace("#" + replaceKey, replacement);
            }
        }

        return text;
    }
    ko.bindingHandlers.restext.getText = getLocalizedText;

})();