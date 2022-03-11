<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Revenus.aspx.cs" Inherits="CMS_DataCell_Solutions._ٌRevenus" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Revenue CMS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>    
</head>
<body>
    <form id="form1" runat="server">
         <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h1 style="text-align: center;">
                        <asp:HiddenField ID="HiddenFieldRevenus" runat="server" />
                        <asp:HiddenField ID="HiddenFieldDeleteRevenus" runat="server" />
                    </h1>
                    <h1 style="text-align: center;">
                        CMS Content Management System</h1>
                </div>
            </div>

            <div class="row">
                <button class="btn btn-primary" id="btnAddRow" onclick="return false;">Add Row</button>
                <asp:Button class="btn btn-danger" ID="btnRevenueSave" runat="server" Text="Save" OnClick="btnSave_Click" OnClientClick="fnSave();"/>
            </div>

            <div class="row" runat="server" id="divSuccessAlert" visible="false">
                <div class="col-md-3"></div>
                <div class="alert alert-success col-md-6">
                    Save successfully!
                </div>
                <div class="col-md-3"></div>
            </div>

            <div class="row">
                <table style="width: 80%;" id="dtRevenue" class="display cell-border">
                    <thead>
                         <tr>
                            <th>No</th>
                            <th style="display: none;">ID</th>
                            <th>TotalRevenue</th>
                            <th>Year</th>
                            <th style="width: 30px;"></th>
                            <th style="width: 40px;"></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    <script type="text/javascript" src="Scripts/DCFun.js"></script>
    </form>
    </body>
</html>
