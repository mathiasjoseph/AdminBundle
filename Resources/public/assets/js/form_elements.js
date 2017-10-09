(function ($) {
    'use strict';
    var getBaseURL = function () {
        var url = document.URL;
        return url.substr(0, url.lastIndexOf('/'));
    }


    function onNewElement() {
        $('[data-init-plugin="select2"]').select2();
    }


    function launchCasper() {
        $.initialize("[data-casper-name]", function() {
            updateCasper(this);
        });
        $(document).on('change', '[data-casper-name]', function () {
            updateCasper(this);
        });
    }

    function updateCasper(element) {
        var hideArray = null;
        var showArray = null;
        var element = $(element);
        var value = element.val();
        if (element.data("casper-hide")) {
            hideArray = element.data("casper-hide");
            if (hideArray[value] != null) {
                hideArray[value].forEach(function (item, index) {
                    var group = element.closest("[data-casper-group]").data("casper-group");
                    element.closest("[data-casper-group]").parent().find("[data-casper-group='" + group + "'] [data-casper-name='" + item + "']").closest("[data-casper-group]").hide();
                })
            }
        }
        if (element.data("casper-show")) {
            showArray = element.data("casper-show");
            if (showArray[value] != null) {
                showArray[value].forEach(function (item, index) {
                    var group = element.closest("[data-casper-group]").data("casper-group");
                    element.closest("[data-casper-group]").parent().find("[data-casper-group='" + group + "'] [data-casper-name='" + item + "']").closest("[data-casper-group]").show();
                })
            }
        }
    }

    function setItemTitleCollection(element) {
        var value = $(element).val();
        var item = $(element).closest('[data-form-collection="item"]');
        var title = item.find('a[data-form-collection="item-title"]');
        title.html(value);
    }
    $(document).ready(function () {
        launchCasper();
        jQuery("[data-form-collection='add']").click(function (e) {
            e.preventDefault();
            var collection = $(this).closest('[data-form-type="collection"]');
            var list = $(collection).find('[data-form-collection="list"]');
            var itemCount = $(list).find('[data-form-collection="item"]').length;
            var newWidget = collection.attr('data-prototype');
            newWidget = newWidget.replace(/__name__/g, itemCount);
            list.append(newWidget);
            $('[data-form-collection-index="' + itemCount + '"] [data-form-collection="item-title"]').click();
            onNewElement();
        });
        $(document).on('click', '.checkbox', function (e) {
            $(this).find(":checkbox").each(function(){
                if( $(this).is(':checked') ){
                    $(this).val(1);
                }else{
                    $(this).val(0);
                }
            });

        });

        $('[data-form-collection="list"]').each(function () {
            var data = $(this).data("form-reference-property");
            if (data != null) {
                if (!Array.isArray(data)){
                $(document).on('change', '[data-form-collection="list"] [name*="[' + data + ']"]', function (e) {
                    setItemTitleCollection(this);
                });
                $(document).on('keypress', '[data-form-collection="list"] [name*="[' + data + ']"]', function (e) {
                    setItemTitleCollection(this);
                });}
            }
        });


        $(document).on('click', "[data-form-collection='delete']", function (e) {
            e.preventDefault();
            $(this).closest('[data-form-collection="item"]').remove();
        });

        $("#multi").val(["Jim", "Lucy"]).select2();
        $.fn.datepicker.Constructor.prototype.getFormat = function () {
            return this.o.format;
        };

        $.initialize(".datepicker-range, .datepicker-component, .datepicker-component2", function() {
            var locale = $(this).find("input[type=text]").data('locale');
            var format = $(this).find("input[type=text]").data('format');
            $(this).datepicker({
                language: locale,
                format: format

            });
        });


        setInterval(function () {
            $('.timepicker').timepicker({showMeridian: false, minuteStep: 1}).on('show.timepicker', function (e) {
                var widget = $('.bootstrap-timepicker-widget');
                widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
                widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
            });
        }, 500);
        $('#datepicker-embeded').datepicker({daysOfWeekDisabled: "0,1"});
        var countries = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'http://revox.io/json/countries-list.json'
        });
        var bestPictures = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'http://revox.io/json/drop-countries.json',
            remote: {url: 'http://revox.io/json/drop-countries.json', wildcard: '%QUERY'}
        });
        $('.sample-typehead').typeahead(null, {name: 'countries', source: countries});
        // $('#custom-templates .typeahead').typeahead(null, {
        //     name: 'best-pictures',
        //     display: 'value',
        //     source: bestPictures,
        //     templates: {
        //         empty: ['<div class="empty-message">', 'unable to find any Best Picture winners that match the current query', '</div>'].join('\n'),
        //         suggestion: Handlebars.compile('<div>{{value}}– {{year}}</div>')
        //     }
        // });
        $('#daterangepicker').daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            format: 'MM/DD/YYYY h:mm A'
        }, function (start, end, label) {
            console.log(start.toISOString(), end.toISOString(), label);
        });


        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        $(function ($) {
            $("#date").mask("99/99/9999");
            $("#phone").mask("(999) 999-9999");
            $("#tin").mask("99-9999999");
            $("#ssn").mask("999-99-9999");
        });
        $('.autonumeric').autoNumeric('init');
        $('.custom-tag-input').tagsinput({});
        var myCustomTemplates = {
            "font-styles": function (locale) {
                return '<li class="dropdown">' + '<a data-toggle="dropdown" class="btn btn-default dropdown-toggle ">' + '<span class="editor-icon editor-icon-headline"></span>' + '<span class="current-font">Normal</span>' + '<b class="caret"></b>' + '</a>' + '<ul class="dropdown-menu">' + '<li><a tabindex="-1" data-wysihtml5-command-value="p" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">Normal</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h1" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">1</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h2" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">2</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h3" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">3</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h4" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">4</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h5" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">5</a></li>' + '<li><a tabindex="-1" data-wysihtml5-command-value="h6" data-wysihtml5-command="formatBlock" href="javascript:;" unselectable="on">6</a></li>' + '</ul>' + '</li>';
            }, emphasis: function (locale) {
                return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="CTRL+B" data-wysihtml5-command="bold" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-bold"></i></a>' + '<a tabindex="-1" title="CTRL+I" data-wysihtml5-command="italic" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-italic"></i></a>' + '<a tabindex="-1" title="CTRL+U" data-wysihtml5-command="underline" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-underline"></i></a>' + '</div>' + '</li>';
            }, blockquote: function (locale) {
                return '<li>' + '<a tabindex="-1" data-wysihtml5-display-format-name="false" data-wysihtml5-command-value="blockquote" data-wysihtml5-command="formatBlock" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-quote"></i>' + '</a>' + '</li>'
            }, lists: function (locale) {
                return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Unordered list" data-wysihtml5-command="insertUnorderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ul"></i></a>' + '<a tabindex="-1" title="Ordered list" data-wysihtml5-command="insertOrderedList" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-ol"></i></a>' + '<a tabindex="-1" title="Outdent" data-wysihtml5-command="Outdent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-outdent"></i></a>' + '<a tabindex="-1" title="Indent" data-wysihtml5-command="Indent" class="btn  btn-default" href="javascript:;" unselectable="on"><i class="editor-icon editor-icon-indent"></i></a>' + '</div>' + '</li>'
            }, image: function (locale) {
                return '<li>' + '<div class="bootstrap-wysihtml5-insert-image-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert image</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-image-url form-control" value="http://">' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary">Insert image</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert image" data-wysihtml5-command="insertImage" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-image"></i>' + '</a>' + '</li>'
            }, link: function (locale) {
                return '<li>' + '<div class="bootstrap-wysihtml5-insert-link-modal modal fade">' + '<div class="modal-dialog ">' + '<div class="modal-content">' + '<div class="modal-header">' + '<a data-dismiss="modal" class="close">×</a>' + '<h3>Insert link</h3>' + '</div>' + '<div class="modal-body">' + '<input class="bootstrap-wysihtml5-insert-link-url form-control" value="http://">' + '<label class="checkbox"> <input type="checkbox" checked="" class="bootstrap-wysihtml5-insert-link-target">Open link in new window</label>' + '</div>' + '<div class="modal-footer">' + '<a data-dismiss="modal" class="btn btn-default">Cancel</a>' + '<a data-dismiss="modal" class="btn btn-primary" href="#">Insert link</a>' + '</div>' + '</div>' + '</div>' + '</div>' + '<a tabindex="-1" title="Insert link" data-wysihtml5-command="createLink" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-link"></i>' + '</a>' + '</li>'
            }, html: function (locale) {
                return '<li>' + '<div class="btn-group">' + '<a tabindex="-1" title="Edit HTML" data-wysihtml5-action="change_view" class="btn  btn-default" href="javascript:;" unselectable="on">' + '<i class="editor-icon editor-icon-html"></i>' + '</a>' + '</div>' + '</li>'
            }
        }

        $('#summernote').summernote({
            height: 200, onfocus: function (e) {
                $('body').addClass('overlay-disabled');
            }, onblur: function (e) {
                $('body').removeClass('overlay-disabled');
            }
        });
    });
})(window.jQuery);