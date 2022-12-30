import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'Encomenda.dart';
import 'EncomendasPage.dart';
import 'homePage.dart';
import 'EncomendaDetailsPage.dart';
import 'dart:convert' show utf8;
import 'package:http/http.dart' as http;

import 'globals.dart' as globals;

Future<List<Encomenda>> fetchEncomendas() async {
  String url = "${globals.apiEndpoint}cliente/${globals.userId}/encomendas";

  final response = await http.get(Uri.parse(url), headers: {
    HttpHeaders.authorizationHeader: 'Bearer ${globals.token}',
  });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    // need to use utf8 decode because of special chars
    List<dynamic> body = jsonDecode(utf8.decode(response.bodyBytes));
    List<Encomenda> posts = body
        .map(
          (dynamic item) => Encomenda.fromJson(item),
        )
        .toList();
    List<Encomenda> post2 = [];
    for (Encomenda i in posts) {
      if (i.estado == "ENTREGUE") {
        post2.add(i);
      }
    }
    //debugPrint(posts.toString());
    return post2;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class ConfirmPage extends StatefulWidget {
  const ConfirmPage({Key? key}) : super(key: key);

  @override
  State<ConfirmPage> createState() => _ConfirmPageState();
}

class _ConfirmPageState extends State<ConfirmPage> {
  void confirmEncomenda(int id, int clientid) async {
    String url =
        "${globals.apiEndpoint}cliente/${clientid.toString()}/confirmar/${id.toString()}";

    try {
      final response = await http.put(Uri.parse(url), headers: {
        HttpHeaders.authorizationHeader: 'Bearer ${globals.token}',
      });
      if (response.statusCode == 200) {}
      return;
    } catch (er) {}
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: Colors.black),
          backgroundColor: const Color.fromARGB(0, 255, 255, 255),
          elevation: 0,
          actions: [
            IconButton(
                color: Colors.black,
                icon: const Icon(Icons.notifications),
                tooltip: 'View Notifications',
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text('This is does nothing for now')));
                })
          ],
        ),
        body: FutureBuilder(
          future: fetchEncomendas(),
          builder:
              (BuildContext context, AsyncSnapshot<List<Encomenda>> snapshot) {
            if (snapshot.hasData) {
              List<Encomenda>? encomendas = snapshot.data;

              Map<String, Color> colors = {
                "REGISTADA": Color.fromARGB(232, 15, 185, 207),
                "EM_TRANSITO": Color.fromARGB(239, 241, 238, 17),
                "ENTREGUE": Color.fromARGB(238, 86, 221, 33),
                "EM_DISTRIBUICAO": Color.fromARGB(238, 241, 17, 222)
              };

              return Scaffold(
                  body: Align(
                alignment: Alignment.topCenter,
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: SingleChildScrollView(
                      scrollDirection: Axis.vertical,
                      child: DataTable(
                        onSelectAll: (b) {},
                        sortColumnIndex: 0,
                        sortAscending: true,
                        showCheckboxColumn: false, // <-- this is important
                        columns: const <DataColumn>[
                          DataColumn(label: Text("id")),
                          DataColumn(label: Text("estado")),
                          DataColumn(label: Text("Confirmar")),
                        ],
                        rows: encomendas!
                            .map(
                              (Encomenda encomenda) => DataRow(
                                cells: [
                                  DataCell(
                                    Text("${encomenda.id}"),
                                  ),
                                  DataCell(
                                    Container(
                                      padding: const EdgeInsets.all(5),
                                      child: Text("${encomenda.estado}"),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: colors["${encomenda.estado}"],
                                      ),
                                    ),
                                  ),
                                  DataCell(
                                    ElevatedButton(
                                        child: Icon(Icons.check_box_outlined),
                                        style: ElevatedButton.styleFrom(
                                            backgroundColor: Color.fromARGB(
                                                238, 86, 221, 33)),
                                        onPressed: () => setState(() {
                                              confirmEncomenda(encomenda.id,
                                                  encomenda.destinatarioId);
                                            })),
                                  )
                                ],
                                onSelectChanged: (newValue) {
                                  Navigator.of(context).pushReplacement(
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              EncomendaDetailsPage(
                                                  encomendaid: encomenda.id)));
                                },
                              ),
                            )
                            .toList(),
                      )),
                ),
              ));
            } else {
              return const Center(child: CircularProgressIndicator());
            }
          },
        ),
        drawer: const NavigationDrawer(),
      );
}

class NavigationDrawer extends StatelessWidget {
  const NavigationDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => Drawer(
        child: SingleChildScrollView(
            child: Column(
          children: [
            Container(padding: EdgeInsets.only(top: 60)),
            ListTile(
              leading: const Icon(Icons.home_outlined),
              title: const Text("Dashboard"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => const HomePage())),
            ),
            ListTile(
              leading: const FaIcon(FontAwesomeIcons.cube),
              title: const Text("Encomendas"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(
                      builder: (context) => const EncomendasPage())),
            ),
            ListTile(
              leading: const Icon(Icons.check_circle_outlined),
              title: const Text("Confirmar"),
              onTap: () => Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) => const ConfirmPage())),
            ),
          ],
        )),
      );
}
