import 'package:mobile_app/EncomendaDetailsPage.dart';

class Localizacao {
  final int id;
  final String distrito;
  final String concelho;
  final String freguesia;
  final String rua;
  final String codigopostal;

  Localizacao(this.id, this.distrito, this.concelho, this.freguesia, this.rua,
      this.codigopostal);

  factory Localizacao.fromJson(Map<String, dynamic> json) {
    return Localizacao(json["id"], json["distrito"], json["concelho"],
        json["freguesia"], json["rua"], json["codigopostal"]);
  }
}

class Encomenda {
  final int id;
  final String estado;
  final String emissor;
  final String destinatario;
  final int destinatarioId;
  final Localizacao localizacao;
  final double peso;
  final int transportador;
  final String timestamp;
  final bool confirmacao;

  const Encomenda(
      {required this.id,
      required this.estado,
      required this.emissor,
      required this.destinatario,
      required this.destinatarioId,
      required this.localizacao,
      required this.peso,
      required this.transportador,
      required this.timestamp,
      required this.confirmacao});

  factory Encomenda.fromJson(Map<String, dynamic> json) {
    return Encomenda(
        id: json['id'],
        confirmacao: json['confirmacao'],
        destinatario: json["destinatario"],
        destinatarioId: json["destinatarioId"],
        emissor: json["emissor"],
        peso: json["peso"],
        transportador: json["transportador"],
        localizacao: Localizacao.fromJson(json["localizacao"]),
        estado: json["estado"],
        timestamp: json["timestamp"]);
  }
}

class EncomendaDetails {
  final String id;
  final int encomenda;
  final List<Estado> history;

  const EncomendaDetails(
      {required this.id, required this.encomenda, required this.history});

  factory EncomendaDetails.fromJson(Map<String, dynamic> json) {
    List<dynamic> body = json["history"];
    List<Estado> posts = body
        .map(
          (dynamic item) => Estado.fromJson(item),
        )
        .toList();
    return EncomendaDetails(
        id: json['_id'], encomenda: json['encomenda'], history: posts);
  }
}

class Estado {
  final String estado;
  final String timestamp;
  final bool confirmacao;

  const Estado(
      {required this.estado,
      required this.timestamp,
      required this.confirmacao});

  factory Estado.fromJson(Map<String, dynamic> json) {
    return Estado(
        confirmacao: json['confirmacao'],
        estado: json["estado"],
        timestamp: json["timestamp"]);
  }
}
