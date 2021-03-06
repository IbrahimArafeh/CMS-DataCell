$(document).ready(function () {
    fnLoadDataTableInstance();
    $("#btnAddRow").click(function () {
        $('#dtRevenue').dataTable().fnAddData([{ ID: '-1', TotalRevenue: '', Year : '' }]);
        $("#dtRevenue tbody tr:last td .edit").trigger("click");
    });
});

function fnLoadDataTableInstance() {
    var dataSource = JSON.parse($("#HiddenFieldRevenus").val());

    $('#dtRevenue').DataTable({
        dom: 'Bfrtip',
        data: dataSource,
        columns: [
            {
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                width: "3px"
            },
            //{ data: 'ID', class: 'editable text' },
            { data: 'TotalRevenue', class: 'editable text' },
            { data: 'Year', class: 'editable text' },
            {
                render: function (data, type, row) {
                    return createButton('edit');
                }
            },
            {
                render: function (data, type, row) {
                    return createButton('delete');
                }
            }
        ],
        "searching": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "language": {
            "emptyTable": "No data available"
        },
        "fnRowCallback": function (nRow, aData, iDisplayIndex) {
            $("td:first", nRow).html(iDisplayIndex + 1);
            return nRow;
        },
    })
}

function createButton(buttonType) {
    var buttonText = buttonType == "edit" ? "Edit" : "Delete";
    return '<button class="btn btn-default ' + buttonType + '" type="button">' + buttonText + '</button>';
}

$('#dtRevenue').on('click', 'tbody td .edit', function (e) {
    fnResetControls();
    var clickedRow = $($(this).closest('td')).closest('tr');
    $(clickedRow).find('td').each(function () {
        if ($(this).hasClass('editable')) {
            var cell = clickedRow.dataTableSettings[0].aoColumns[$(this)[0].cellIndex];
            if ($(this).hasClass('text')) {
                var html = fnCreateTextBox($(this).html(), cell.data);
                $(this).html($(html));
            }
            else if ($(this).hasClass('int')) {
                var html = fnCreateIntTextBox($(this).html(), cell.data);
                $(this).html($(html));
            }
            else if ($(this).hasClass('select')) {
                var html = fnCreateDropdownList($(this).html(), cell.data);
                $(this).html($(html));
            }
            else if ($(this).hasClass('date')) {
                var html = fnCreateDate($(this).html(), cell.data);
                $(this).html($(html));

                $("[data-field=JoinedDate]").datepicker({
                    dateFormat: 'yy-mm-dd',
                    endDate: '+0d',
                    todayHighlight: true,
                    autoclose: true
                });
            }

            $("input,select").keypress(function (event) {
                if (event.keyCode == 13) {
                    textboxes = $("input,select,button");
                    currentBoxNumber = textboxes.index(this);
                    if (textboxes[currentBoxNumber + 1] != null) {
                        nextBox = textboxes[currentBoxNumber + 1]
                        nextBox.focus();
                        event.preventDefault();
                        return false
                    }
                }
            });
        }
    });

    $('#dtRevenue tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtRevenue tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
    $(clickedRow).find('td .edit').removeClass('edit').addClass('update').html('Update');
    $(clickedRow).find('td .delete').removeClass('delete').addClass('cancel').html('Cancel');
});

function fnResetControls() {
    var openedTextBox = $('#dtRevenue').find('input');
    $.each(openedTextBox, function (k, $cell) {
        var resetRow = $('#dtRevenue').DataTable().row($cell.parentNode).data();
        var oldValue = $(resetRow).attr($(openedTextBox[k]).attr("data-field"));
        $(openedTextBox[k]).closest('td').html(oldValue);
    })
}

function fnCreateTextBox(value, fieldprop) {
    return '<input class="form-control" data-field="' + fieldprop + '" type="text" value="' + fnEscapeHtml(value) + '" ></input>';
}

function fnEscapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function fnCreateIntTextBox(value, fieldprop) {
    return '<input class="form-control" onkeypress="return fnIsIntKey(event)" data-field="' + fieldprop + '" type="text" value="' + fnEscapeHtml(value) + '" ></input>';
}

function fnEscapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}

function fnCreateDropdownList(value, fieldprop) {
    /*var myOptions = [
        { key: 'Kuala Lumpur', value: 'Kuala Lumpur' }
    ];*/

    var myOptions = JSON.parse($("#HiddenFieldCity").val());

    var options;
    $.each(myOptions, function (key, val) {
        if (val.Value === value) {
            options += '<option value="' + val.Value + '" selected>' + fnEscapeHtml(val.Name) + '</option>';
        } else {
            options += '<option value="' + val.Value + '">' + fnEscapeHtml(val.Name) + '</option>';
        }
    });
    return '<select class="form-control" data-field="' + fieldprop + '">' + options + '</select>';
}

function fnCreateDate(value, fieldprop) {
    return '<input class="form-control" data-field="' + fieldprop + '" type="text" value="' + value.substring(0, 10) + '" ></input>';
}


$('#dtRevenue').on('click', 'tbody td .cancel', function (e) {
    fnResetControls();
    $('#dtUser tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtUser tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
});

$('#dtRevenue').on('click', 'tbody td .delete', function (e) {
    fnResetControls();

    var dataTable = $('#dtRevenue').DataTable();

    var currentRow = dataTable.row($(this).parents('tr'));

    if (currentRow.data().ID != "-1") {
        var deletedUserJson = JSON.parse($("#HiddenFieldDeleteRevenus").val());
        deletedUserJson.push(currentRow.data());
        $('input#HiddenFieldDeleteRevenus').val(JSON.stringify(deletedUserJson));
    }

    currentRow.remove().draw();
    $('#dtUser tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtUser tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
});


$('#dtRevenue').on('click', 'tbody td .update', function (e) {
    //var email = $('#dtRevenue').find("input[data-field='Email']").val();
    //if (!fnValidateEmail(email)) {
    //    alert("Invalid Email Format!");
    //    return;
    //}

    //var date = $('#dtRevenue').find("input[data-field='JoinedDate']").val();
    //if (!fnIsDate(date)) {
    //    alert("Invalid Date Format (yyyy-MM-dd)!");
    //    return;
    //}

    var openedTextBox = $('#dtRevenue').find('input');
    $.each(openedTextBox, function (k, $cell) {
        fnUpdateDataTableValue($cell, $cell.value);
        $(openedTextBox[k]).closest('td').html(fnEscapeHtml($cell.value));
    })

    //var openedSelect = $('#dtUser').find('select');
    //$.each(openedSelect, function (k, $cell) {
    //    fnUpdateDataTableValue($cell, $cell.value);
    //    $(openedSelect[k]).closest('td').html(fnEscapeHtml($cell.value));
    //})

    $('#dtUser tbody tr td .update').removeClass('update').addClass('edit').html('Edit');
    $('#dtUser tbody tr td .cancel').removeClass('cancel').addClass('delete').html('Delete');
});


function fnUpdateDataTableValue($inputCell, value) {
    var dataTable = $('#dtRevenue').DataTable();
    var rowIndex = dataTable.row($($inputCell).closest('tr')).index();
    var fieldName = $($inputCell).attr('data-field');
    dataTable.rows().data()[rowIndex][fieldName] = value;
}


function fnSave() {
    var jsonData = JSON.stringify($('#dtRevenue').DataTable().rows().data().toArray());
    $('input#HiddenFieldRevenus').val(jsonData);
}

var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function fnValidateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}