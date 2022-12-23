import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'Encomenda.dart';
import 'homePage.dart';
import 'EncomendaDetailsPage.dart';
import 'dart:convert' show utf8;
import 'package:http/http.dart' as http;

import 'globals.dart' as globals;

Future<List<Encomenda>> fetchEncomendas() async {
  String url = "${globals.apiEndpoint}cliente/1/encomendas";

  final response = await http.get(Uri.parse(url));

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
    //debugPrint(posts.toString());
    return posts;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class EncomendasPage extends StatelessWidget {
  const EncomendasPage({Key? key}) : super(key: key);

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
                  body: Center(
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
                          DataColumn(label: Text("Destino")),
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
                                    Text("${encomenda.localizacao.distrito}"),
                                  ),
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
          ],
        )),
      );
}
