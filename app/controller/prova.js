var hash = require('./hash')

function nonnt () {
    let hashed = "92a455d5932ee21e7d6251003f954b827a0976f7c4ddeb1ed421f7ea7c24c9b1d0cb2f3f31104c13e8d37b74494149b980366aa05382a9ccd25309b76f66ee5cf396dedba7ef6ce1e4e618c1a569cd7ca9a78fdeacd569ee8bd9d5ea91b9a3db49de638f5d1ec2041899c120d525cc96912cd5cfa1eb240eadbbfb451737ca024e1513937b3cc8a34f3d29d97a0e921506736abaa95474f9e3027461e561c6962ace3cc6b42fa858bb55fa9df53820f10be548d9a423f1cf3df53b87b77d7ba71568491cb36a1b4728c1a259430a256dc2ed92a45e91df5efd3923fed960b56cdbcfd738b4fbf5c7e22f1707767601d92d297ecaea20c16a4b16cf9a8c1a6556ceea5f7da7263b3d89ec89ef54c04b9c391d1e029ae275fbf95bb148102486793b8c1eb6310564ee6843a053f578269657bdcca57266afa48d87c41e05f3b4cdec863e083de4f20547fe7ba3255d54fab24e0839bd599639af3812a4d46f2b8a2d4c7435850157818ac50be418ec82736756b44802e20e17ed90b359dec27dfe403b3e2012d3458a68df27ae096c49775f728ed637c2f284d324456dd86687a969699460a95c9f0c71aad881ba01eac7172a449eee7e341b110a700590bae194ac2618877987b5d1b0e0f869ac85a84ca35f90b826e61e4d95d282077b77ce24afb1ce5c09a2ead21a79c5b48c8d5320507fd5cbc858c0029615daa2cda05ad1";
    let salt = "REZhZazMBrKCNuqgSCxpFmYOnTbjfw+RvmTW5EJfdn2bDMAsq+Vgq/2nswAHpLHpJLLCQRDaKDRIKn4sKIXDAUx7x9VaHnfLG2UXgSsxyT/faXkCRZaHxxt8oimUHXZVdnOGSC6MqOwvszra/lmxjiVqpvXzv+fLmMNzs3JbKp5cwppzyTc/bRlDRsJ3bdQmPzGjkwn8RKNHu2KuicOBv8OlePHGawnER/OHjrCdSeEYmzDezC3bkVnYZ1QYR+Rzkatbb3MaUT1tjf98aUHu1yFLW4Od4B/TO3cs1AfHwto9SL3AIras7mTIHoQnAgPIm3JmNN6N47WyHJl7jnfBRA==";
    let password = "Gerardocitro1!";
    
    console.log(hash.checkPassword(hashed, salt, password));
} 

nonnt();