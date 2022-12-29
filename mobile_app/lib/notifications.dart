import 'dart:convert' show utf8;
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'EncomendaDetailsPage.dart';
import 'globals.dart' as globals;

Future<List<Map<String, dynamic>>> fetchNotificacoesShort() async {
  String url =
      "${globals.apiEndpoint}cliente/${globals.userId.toString()}/notificacoes";

  final response = await http.get(Uri.parse(url));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    // need to use utf8 decode because of special chars
    List<dynamic> body = jsonDecode(utf8.decode(response.bodyBytes));

    List<Map<String, dynamic>> listBody = [];

    for (dynamic a in body) {
      Map<String, dynamic> json = a;
      listBody.add(json);
    }

    listBody.sort((a, b) => (a["timestamp"].compareTo(b["timestamp"])));
    //debugPrint(listBody.toString());
    if (listBody.length > 5) {
      return listBody.sublist(listBody.length - 6, listBody.length - 1);
    } else {
      return [];
    }
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

Future<List<Map<String, dynamic>>> fetchNotificacoes() async {
  String url =
      "${globals.apiEndpoint}cliente/${globals.userId.toString()}/notificacoes";

  final response = await http.get(Uri.parse(url));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    // need to use utf8 decode because of special chars
    List<dynamic> body = jsonDecode(utf8.decode(response.bodyBytes));

    List<Map<String, dynamic>> listBody = [];

    for (dynamic a in body) {
      Map<String, dynamic> json = a;
      listBody.add(json);
    }

    listBody.sort((a, b) => (b["timestamp"]).compareTo(a["timestamp"]));
    //debugPrint(listBody.toString());
    globals.notificationsNumber = listBody.length;
    return listBody;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class NotificationsShort extends StatefulWidget {
  const NotificationsShort({super.key});

  @override
  State<NotificationsShort> createState() => _NotificationsShortState();
}

class _NotificationsShortState extends State<NotificationsShort> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: fetchNotificacoesShort(),
        builder: (BuildContext context,
            AsyncSnapshot<List<Map<String, dynamic>>> snapshot) {
          if (snapshot.hasData) {
            List<Map<String, dynamic>>? noticacoes = snapshot.data;
            if (noticacoes!.length > 0) {
              return SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: DataTable(
                    onSelectAll: (b) {},
                    sortColumnIndex: 0,
                    sortAscending: true,
                    showCheckboxColumn: false,
                    columns: const <DataColumn>[
                      DataColumn(label: Text("id")),
                      DataColumn(label: Text("Novo Estado")),
                      DataColumn(label: Text("TimeStamp")),
                    ],
                    rows: noticacoes
                        .map((Map<String, dynamic> e) => DataRow(
                                cells: [
                                  DataCell(
                                    Text("${e["encomendaId"].toString()}"),
                                  ),
                                  DataCell(
                                    Text("${e["newState"]}"),
                                  ),
                                  DataCell(
                                    Text("${e["timestamp"].split(' ')[1]}"),
                                  ),
                                ],
                                onSelectChanged: (newValue) {
                                  Navigator.of(context).pushReplacement(
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              EncomendaDetailsPage(
                                                  encomendaid:
                                                      e["encomendaId"])));
                                }))
                        .toList()),
              );
            }
            return Container();
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        });
  }
}

class Notifications extends StatefulWidget {
  const Notifications({super.key});

  @override
  State<Notifications> createState() => _NotificationsState();
}

class _NotificationsState extends State<Notifications> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: fetchNotificacoes(),
        builder: (BuildContext context,
            AsyncSnapshot<List<Map<String, dynamic>>> snapshot) {
          if (snapshot.hasData) {
            List<Map<String, dynamic>>? noticacoes = snapshot.data;
            if (noticacoes!.length > 0) {
              return SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: DataTable(
                    onSelectAll: (b) {},
                    sortColumnIndex: 0,
                    sortAscending: true,
                    showCheckboxColumn: false,
                    columns: const <DataColumn>[
                      DataColumn(label: Text("id")),
                      DataColumn(label: Text("Novo Estado")),
                      DataColumn(label: Text("TimeStamp")),
                    ],
                    rows: noticacoes
                        .map((Map<String, dynamic> e) => DataRow(
                                cells: [
                                  DataCell(
                                    Text("${e["encomendaId"].toString()}"),
                                  ),
                                  DataCell(
                                    Text("${e["newState"]}"),
                                  ),
                                  DataCell(
                                    Text("${e["timestamp"].split(' ')[1]}"),
                                  ),
                                ],
                                onSelectChanged: (newValue) {
                                  Navigator.of(context).pushReplacement(
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              EncomendaDetailsPage(
                                                  encomendaid:
                                                      e["encomendaId"])));
                                }))
                        .toList()),
              );
            }
            return Container();
          } else {
            return const Center(child: CircularProgressIndicator());
          }
        });
  }
}
