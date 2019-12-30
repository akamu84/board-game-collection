import xmljs from "xml-js";

export async function getCollectionAsync(
  userName: string
): Promise<ICollection> {
  let response = await callBatchedEndpointAsync(
    `https://boardgamegeek.com/xmlapi/collection/${userName}?own=1`
  );
  let data = await response.text();
  return convertToJson(data, userName);
}

async function callBatchedEndpointAsync(url: string): Promise<any> {
  let response = new Response();
  try {
    response = await fetch(url);
    if (response.status === 202) {
      await sleep(500);
      response = await callBatchedEndpointAsync(url);
    }
  } catch (err) {
    response = new Response(`
      <?xml version="1.0" encoding="utf-8" standalone="yes" ?>
      <errors>
        <error>
          <message>${err}</message>
        </error>
      </errors>
    `);
  } finally {
    return response;
  }
}

function convertToJson(data: any, userName: string): ICollection {
  let source: any = JSON.parse(
    xmljs.xml2json(data, { compact: true, spaces: 4, ignoreDeclaration: true })
  );
  let converted: ICollection = {} as ICollection;
  let items = [];

  if (source.errors) {
    converted.hasError = true;
    converted.error = source.errors.error.message._text;
  }

  if (source.items) {
    converted.hasError = false;
    converted.totalItems = source.items._attributes.totalitems;
    converted.owner = userName;

    items = source.items.item.map(function(element: any) {
      let convertedItem: IGame = {} as IGame;
      convertedItem.id = element._attributes.objectid;
      convertedItem.type = element._attributes.subtype;
      convertedItem.name = element.name._text;
      convertedItem.published = parseFloat(element.yearpublished._text);
      convertedItem.image = element.image._text;
      convertedItem.thumbnail = element.thumbnail._text;
      convertedItem.stats = {
        minPlayers: parseFloat(element.stats._attributes.minplayers) || 0,
        maxPlayers: parseFloat(element.stats._attributes.maxplayers) || 99,
        playingTime: parseFloat(element.stats._attributes.playingtime) || 0
      };
      convertedItem.rating =
        parseFloat(element.stats.rating.average._attributes.value) || 0;

      return convertedItem;
    });

    converted.games = items;
  }

  return converted;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export interface IGame {
  id: number;
  type: string;
  name: string;
  published: number;
  image: string;
  thumbnail: string;
  stats: {
    minPlayers: number;
    maxPlayers: number;
    playingTime: number;
  };
  rating: number;
}

export interface ICollection {
  hasError: boolean;
  error: string;
  totalItems: number;
  owner: string;
  games: IGame[];
}
