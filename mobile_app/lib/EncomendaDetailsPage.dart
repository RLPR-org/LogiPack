import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'EncomendasPage.dart';
import 'Encomenda.dart';
import 'homePage.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' show utf8;
import 'dart:convert';
import 'globals.dart' as globals;

Future<List<dynamic>> fetchEncomendas(int id) async {
  String urlDetails =
      "${globals.apiEndpoint}encomendas/${id.toString()}/details";
  String url = "${globals.apiEndpoint}encomendas/${id.toString()}";

  final response = await http.get(Uri.parse(url));
  final responseDetails = await http.get(Uri.parse(urlDetails));

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    // need to use utf8 decode because of special chars
    Map<String, dynamic> body = jsonDecode(utf8.decode(response.bodyBytes));
    Encomenda encomenda = Encomenda.fromJson(body);

    Map<String, dynamic> bodyDetails =
        jsonDecode(utf8.decode(responseDetails.bodyBytes));
    EncomendaDetails encomendaDetails = EncomendaDetails.fromJson(bodyDetails);
    //print(encomendaDetails.history);
    return [encomenda, encomendaDetails];
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load');
  }
}

class EncomendaDetailsPage extends StatelessWidget {
  int encomendaid;
  EncomendaDetailsPage({Key? key, required this.encomendaid}) : super(key: key);

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
          future: fetchEncomendas(encomendaid),
          builder:
              (BuildContext context, AsyncSnapshot<List<dynamic>> snapshot) {
            if (snapshot.hasData) {
              List? data = snapshot.data;

              Color confirmacao = Color.fromARGB(0, 0, 0, 0);
              String confirmcaoString = "";
              Encomenda encomenda = data![0];
              EncomendaDetails encomendaDetails = data[1];

              if (encomenda.confirmacao) {
                confirmacao = Color.fromARGB(230, 75, 224, 15);
                confirmcaoString = "Confirmada";
              } else {
                confirmacao = Color.fromARGB(230, 224, 22, 15);
                confirmcaoString = "Não Confirmada";
              }

              Map<String, Color> colors = {
                "REGISTADA": const Color.fromARGB(232, 15, 185, 207),
                "EM_TRANSITO": const Color.fromARGB(239, 241, 238, 17),
                "ENTREGUE": const Color.fromARGB(238, 86, 221, 33),
                "EM_DISTRIBUICAO": const Color.fromARGB(238, 241, 17, 222)
              };

              List<Estado> historico = encomendaDetails.history;

              Estado lastEstado = historico.removeLast();

              return Scaffold(
                  body: SingleChildScrollView(
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Padding(
                          padding: const EdgeInsets.only(
                              left: 25, top: 10, bottom: 10),
                          child: Text(
                            "Encomeda ${encomendaid}",
                            style: const TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          )),
                    ),
                    Center(
                      child: Container(
                        padding: const EdgeInsets.only(left: 20, right: 20),
                        child: Table(
                          border: TableBorder.all(
                              color: Colors.black,
                              style: BorderStyle.none,
                              borderRadius: BorderRadius.circular(20),
                              width: 0.5),
                          children: [
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Id",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.id}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Emissor",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.emissor}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Recetor",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.destinatario}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Peso",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.peso.toStringAsFixed(2)} kg",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Estado",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 3, bottom: 3),
                                    child: Container(
                                      padding: const EdgeInsets.only(
                                          top: 5.0,
                                          left: 8.0,
                                          right: 8.0,
                                          bottom: 5.0),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: colors["${encomenda.estado}"],
                                      ),
                                      child: Text(
                                        "${encomenda.estado}",
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding:
                                        EdgeInsets.only(left: 8.0, right: 8.0),
                                    child: Text(
                                      "Transportador",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.transportador}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Última atualização",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.timestamp}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0,
                                        left: 8.0,
                                        right: 8.0,
                                        bottom: 8.0),
                                    child: Text(
                                      "Confirmação da receção",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 3.0, bottom: 3.0),
                                    child: Container(
                                      padding: const EdgeInsets.only(
                                          top: 5.0,
                                          left: 8.0,
                                          right: 8.0,
                                          bottom: 5.0),
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.circular(20),
                                        color: confirmacao,
                                      ),
                                      child: Text(
                                        confirmcaoString,
                                      ),
                                    ),
                                  ),
                                ],
                              )
                            ]),
                          ],
                        ),
                      ),
                    ),
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Padding(
                          padding:
                              EdgeInsets.only(left: 25, top: 10, bottom: 10),
                          child: Text(
                            "Destino",
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          )),
                    ),
                    Center(
                      child: Container(
                        padding: const EdgeInsets.only(left: 20, right: 20),
                        child: Table(
                          border: TableBorder.all(
                              color: Colors.black,
                              style: BorderStyle.none,
                              borderRadius: BorderRadius.circular(20),
                              width: 0.5),
                          children: [
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Distrito",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.localizacao.distrito}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Concelho",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.localizacao.concelho}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Freguesia",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.localizacao.freguesia}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "Rua",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0, left: 8.0, right: 8.0),
                                    child: Text(
                                      "${encomenda.localizacao.rua}",
                                    ),
                                  ),
                                ],
                              )
                            ]),
                            TableRow(children: [
                              Column(
                                children: const [
                                  Padding(
                                    padding: EdgeInsets.only(
                                        top: 8.0,
                                        left: 8.0,
                                        right: 8.0,
                                        bottom: 8.0),
                                    child: Text(
                                      "Código Postal",
                                      style: TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                ],
                              ),
                              Column(
                                children: [
                                  Padding(
                                    padding: const EdgeInsets.only(
                                        top: 8.0,
                                        left: 8.0,
                                        right: 8.0,
                                        bottom: 8.0),
                                    child: Text(
                                      "${encomenda.localizacao.codigopostal}",
                                    ),
                                  ),
                                ],
                              )
                            ])
                          ],
                        ),
                      ),
                    ),
                    const Align(
                      alignment: Alignment.centerLeft,
                      child: Padding(
                          padding:
                              EdgeInsets.only(left: 25, top: 10, bottom: 10),
                          child: Text(
                            "Histórico da Encomenda",
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 20),
                          )),
                    ),
                    Column(
                        children: encomendaDetails.history
                            .map((Estado estado) => Align(
                                  alignment: Alignment.centerLeft,
                                  child: Padding(
                                    padding: EdgeInsets.only(left: 35),
                                    child: Column(
                                      children: [
                                        Row(
                                          children: [
                                            Text(
                                              "${estado.estado}  ",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 15),
                                            ),
                                            Text(estado.timestamp),
                                          ],
                                        ),
                                        const Align(
                                          alignment: Alignment.centerLeft,
                                          child: Icon(
                                            Icons.arrow_downward,
                                            color: Colors.blueGrey,
                                            size: 26.0,
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                ))
                            .toList()),
                    Column(children: [
                      Align(
                        alignment: Alignment.centerLeft,
                        child: Padding(
                          padding: const EdgeInsets.only(left: 35),
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  Text(
                                    "${lastEstado.estado}  ",
                                    style: const TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18),
                                  ),
                                  Text(lastEstado.timestamp),
                                ],
                              ),
                            ],
                          ),
                        ),
                      )
                    ])
                  ],
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
