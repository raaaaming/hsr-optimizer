export class CharacterRegistry {

    constructor() {

        this.characters = new Map();

    }

    /**
     * 캐릭터 등록
     */
    register(character) {

        this.characters.set(character.id, character);

    }

    /**
     * 여러 캐릭터 등록
     */
    registerAll(characters) {

        for (const character of characters) {
            this.register(character);
        }

    }

    /**
     * ID로 캐릭터 가져오기
     */
    get(id) {

        return this.characters.get(id) ?? null;

    }

    /**
     * 존재 여부
     */
    has(id) {

        return this.characters.has(id);

    }

    /**
     * 전체 목록
     */
    getAll() {

        return [...this.characters.values()];

    }

    /**
     * 초기화
     */
    clear() {

        this.characters.clear();

    }

}