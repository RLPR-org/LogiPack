## Endpoints

| Endpoint | Method | Request Body | Request Params | Response | Description |
| --- | --- | --- | --- | --- | --- |
| /login/client | POST | Login object | - | Token | Login as a client |
| /login/trasportador | POST | Login object | - | Token | Login as a transportador |
| /login/administrador | POST | Login object | - | Token | Login as a distribuidora |
| /encomendas | GET | - | estado(optional) | Encomenda[] | Get all encomendas |
| /encomendas/{id} | GET | - | - | Encomenda | Get encomenda by id |
| /encomendas/historico/ano | GET | - | - | Encomenda[] | Get all encomendas from the last year |
| /encomendas/historico/mes | GET | - | - | Encomenda[] | Get all encomendas from the last month |
| /encomendas/historico/semana | GET | - | - | Encomenda[] | Get all encomendas from the last week |
| /encomendas/{id}/details | GET | - | - | Encomenda | Get encomenda details by id |
| /cliente/{id}/confirmar/{packageId} | PUT | - | - | - | Confirm encomenda by packageId for a client |
| /cliente/{id}/encomendas | GET | - | - | Encomenda[] | Get all encomendas for a client |
| /cliente/{id}/notificacoes | GET | - | - | Notificacao[] | Get all notifications for a client |
| /cliente/{id}/notificacoes | DELETE | - | - | - | Delete all notifications for a client |
| /estados/encomendas/{id} | PUT | - | estado | - | Update encomenda state |
| /transportadores | GET | - | - | Transportador[] | Get all transportadores |
| /transportadores/{id} | GET | - | - | Transportador | Get transportador by id |
| /transportadores/{id}/details | GET | - | - | Transportador | Get transportador details by id |
| estados/transportadores/{id} | PUT | - | estado | - | Update transportador state |