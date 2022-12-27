import 'dart:developer';

import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'dart:convert' show utf8;
import 'package:http/http.dart' as http;
import 'Encomenda.dart';
import 'globals.dart' as globals;

class Indicator extends StatelessWidget {
  const Indicator({
    super.key,
    required this.color,
    required this.text,
    required this.isSquare,
    this.size = 16,
    this.textColor = const Color(0xff505050),
  });
  final Color color;
  final String text;
  final bool isSquare;
  final double size;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            shape: isSquare ? BoxShape.rectangle : BoxShape.circle,
            color: color,
          ),
        ),
        const SizedBox(
          width: 4,
        ),
        Text(
          text,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: textColor,
          ),
        )
      ],
    );
  }
}

fetchEncomendas() async {
  String url = "${globals.apiEndpoint}cliente/${globals.userId}/encomendas";

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
    Map<String, int> mapa = {
      "REGISTADA": 0,
      "ENTREGUE": 0,
      "EM_TRANSITO": 0,
      "EM_DISTRIBUICAO": 0,
      "CONFIRMADA": 0
    };

    for (Encomenda enc in posts) {
      mapa[enc.estado] = mapa[enc.estado]! + 1;
    }

    return mapa;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Failed to load album');
  }
}

class PieChartSample2 extends StatefulWidget {
  const PieChartSample2({super.key});

  @override
  State<StatefulWidget> createState() => PieChart2State();
}

class PieChart2State extends State {
  int touchedIndex = -1;
  Map<String, int> mapa = {"REGISTADA": 1};

  @override
  void initState() {
    fetchEncomendas().then((data) {
      setState(() {
        mapa = data;
      });
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.3,
      child: Card(
        color: Colors.white,
        child: Row(
          children: <Widget>[
            const SizedBox(
              height: 18,
            ),
            Expanded(
              child: AspectRatio(
                aspectRatio: 1,
                child: PieChart(
                  PieChartData(
                    pieTouchData: PieTouchData(
                      touchCallback: (FlTouchEvent event, pieTouchResponse) {
                        setState(() {
                          if (!event.isInterestedForInteractions ||
                              pieTouchResponse == null ||
                              pieTouchResponse.touchedSection == null) {
                            touchedIndex = -1;
                            return;
                          }
                          touchedIndex = pieTouchResponse
                              .touchedSection!.touchedSectionIndex;
                        });
                      },
                    ),
                    borderData: FlBorderData(
                      show: false,
                    ),
                    sectionsSpace: 0,
                    centerSpaceRadius: 40,
                    sections: showingSections(),
                  ),
                ),
              ),
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const <Widget>[
                Indicator(
                  color: Color.fromARGB(232, 15, 185, 207),
                  text: 'Registada',
                  isSquare: true,
                  size: 8,
                ),
                SizedBox(
                  height: 4,
                ),
                Indicator(
                  color: Color.fromARGB(239, 241, 238, 17),
                  text: 'Em Transito',
                  isSquare: true,
                  size: 8,
                ),
                SizedBox(
                  height: 4,
                ),
                Indicator(
                  color: Color.fromARGB(238, 86, 221, 33),
                  text: 'Entregue',
                  isSquare: true,
                  size: 8,
                ),
                SizedBox(
                  height: 4,
                ),
                Indicator(
                  color: Color.fromARGB(238, 241, 17, 222),
                  text: 'Em Distribuição',
                  isSquare: true,
                  size: 8,
                ),
                SizedBox(
                  height: 4,
                ),
                Indicator(
                  color: Color.fromARGB(255, 0, 2, 95),
                  text: 'Confirmada',
                  isSquare: true,
                  size: 8,
                ),
                SizedBox(
                  height: 18,
                ),
              ],
            ),
            const SizedBox(
              width: 28,
            ),
          ],
        ),
      ),
    );
  }

  List<PieChartSectionData> showingSections() {
    Map<String, Color> colors = {
      "REGISTADA": Color.fromARGB(232, 15, 185, 207),
      "EM_TRANSITO": Color.fromARGB(239, 241, 238, 17),
      "ENTREGUE": Color.fromARGB(238, 86, 221, 33),
      "EM_DISTRIBUICAO": Color.fromARGB(238, 241, 17, 222),
      "CONFIRMADA": Color.fromARGB(255, 0, 2, 95)
    };

    List<PieChartSectionData> here = [];
    int counter = 0;

    for (MapEntry<String, int> entry in mapa.entries) {
      if (entry.value > 0) {
        final isTouched = counter == touchedIndex;
        final fontSize = isTouched ? 25.0 : 16.0;
        final radius = isTouched ? 60.0 : 50.0;
        counter += 1;

        here.add(PieChartSectionData(
          color: colors[entry.key],
          value: mapa[entry.key]?.toDouble(),
          title: mapa[entry.key].toString(),
          radius: radius,
          titleStyle: TextStyle(
            fontSize: fontSize,
            fontWeight: FontWeight.bold,
            color: const Color(0xffffffff),
          ),
        ));
      }
    }

    return here;
  }
}
